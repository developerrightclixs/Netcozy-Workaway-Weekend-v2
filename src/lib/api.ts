import type { User } from '@supabase/supabase-js';
import { supabase } from './supabase';

export interface UserProfileData {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  phone_number: string;
  cell_number: string;
  sex: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  date_of_birth: string | null;
  nationality: string;
  passport_number: string;
  id_document_url: string;
  id_document_name: string;
  role: string;
  approval_status: string;
  service_level: string | null;
  signup_completed: boolean;
  email_verified: boolean;
  interested_in_referral: boolean;
  created_at: string;
  approved_at: string | null;
  agreements_signed_at: string | null;
}

export interface InvokeResult<T> {
  data: T | null;
  error: string | null;
}

/** Profile fields stored on the account record itself, never on a public table. */
export const emptyProfileFields = (email: string) => ({
  email: (email ?? '').toLowerCase(),
  full_name: '',
  phone_number: '',
  cell_number: '',
  sex: '',
  street_address: '',
  city: '',
  state: '',
  zip_code: '',
  country: '',
  date_of_birth: null as string | null,
  nationality: '',
  passport_number: '',
  id_document_path: '',
  id_document_name: '',
  role: 'user',
  approval_status: 'pending',
  service_level: 'basic',
  signup_completed: false,
  email_verified: false,
  interested_in_referral: false,
  approved_at: null as string | null,
  agreements_signed_at: null as string | null,
});

export function buildProfileFromUser(user: User): UserProfileData {
  const raw = (user.user_metadata?.profile ?? {}) as Record<string, unknown>;
  const email = (user.email ?? '').toLowerCase();
  const base = emptyProfileFields(email);

  const pick = <K extends keyof ReturnType<typeof emptyProfileFields>>(key: K) => {
    const value = raw[key as string];
    return (value === undefined || value === null ? base[key] : value) as ReturnType<typeof emptyProfileFields>[K];
  };

  return {
    id: user.id,
    user_id: user.id,
    email,
    full_name: String(pick('full_name') ?? ''),
    phone_number: String(pick('phone_number') ?? ''),
    cell_number: String(pick('cell_number') ?? ''),
    sex: String(pick('sex') ?? ''),
    street_address: String(pick('street_address') ?? ''),
    city: String(pick('city') ?? ''),
    state: String(pick('state') ?? ''),
    zip_code: String(pick('zip_code') ?? ''),
    country: String(pick('country') ?? ''),
    date_of_birth: (raw.date_of_birth as string | null) ?? null,
    nationality: String(pick('nationality') ?? ''),
    passport_number: String(pick('passport_number') ?? ''),
    id_document_url: String(raw.id_document_path ?? ''),
    id_document_name: String(pick('id_document_name') ?? ''),
    role: String(pick('role') ?? 'user'),
    approval_status: String(pick('approval_status') ?? 'pending'),
    service_level: (raw.service_level as string | null) ?? 'basic',
    signup_completed: Boolean(raw.signup_completed),
    email_verified: Boolean(raw.email_verified) || Boolean(user.email_confirmed_at),
    interested_in_referral: Boolean(raw.interested_in_referral),
    created_at: user.created_at ?? new Date().toISOString(),
    approved_at: (raw.approved_at as string | null) ?? null,
    agreements_signed_at: (raw.agreements_signed_at as string | null) ?? null,
  };
}

/**
 * Reads the signed-in person's profile. Profile details live on the account
 * record itself, so this needs no backend function and no privileged key.
 */
export async function fetchMyProfile(): Promise<
  InvokeResult<{ success: boolean; profile: UserProfileData }>
> {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData?.session?.user) {
      return { data: null, error: 'You need to be signed in.' };
    }

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      return { data: null, error: 'Your session has expired. Please sign in again.' };
    }

    return { data: { success: true, profile: buildProfileFromUser(data.user) }, error: null };
  } catch (err) {
    return {
      data: null,
      error: (err as { message?: string })?.message || 'We could not load your account details.',
    };
  }
}

/** Merges the given fields into the signed-in person's own profile record. */
export async function saveMyProfile(
  patch: Record<string, unknown>,
): Promise<InvokeResult<{ success: boolean; profile: UserProfileData }>> {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    const user = userData?.user;
    if (userError || !user) {
      return { data: null, error: 'Your session has expired. Please sign in again.' };
    }

    const existing = (user.user_metadata?.profile ?? {}) as Record<string, unknown>;
    const profile = {
      ...emptyProfileFields(user.email ?? ''),
      ...existing,
      ...patch,
      email: (user.email ?? '').toLowerCase(),
    };

    const { data, error } = await supabase.auth.updateUser({ data: { profile } });
    if (error || !data?.user) {
      return { data: null, error: error?.message || 'We could not save your details. Please try again.' };
    }

    return { data: { success: true, profile: buildProfileFromUser(data.user) }, error: null };
  } catch (err) {
    return {
      data: null,
      error: (err as { message?: string })?.message || 'We could not save your details.',
    };
  }
}

/**
 * Turns a backend function error response into a readable message.
 */
const readErrorMessage = async (error: unknown): Promise<string> => {
  const fallback =
    (error as { message?: string })?.message || 'Something went wrong. Please try again.';
  const context = (error as { context?: Response })?.context;
  if (!context || typeof context.json !== 'function') return fallback;

  try {
    const payload = await context.json();
    return (
      payload?.error ||
      payload?.message ||
      payload?.meta?.message ||
      payload?.diagnostics?.error ||
      fallback
    );
  } catch {
    return fallback;
  }
};

/** Lightweight wrapper for calling backend functions with readable errors. */
export async function invokeFunction<T = Record<string, unknown>>(
  name: string,
  body?: Record<string, unknown> | FormData,
): Promise<InvokeResult<T>> {
  try {
    const { data, error } = await supabase.functions.invoke(name, {
      body: body ?? {},
    });

    if (error) {
      return { data: null, error: await readErrorMessage(error) };
    }

    const payload = data as Record<string, unknown> | null;
    if (payload && typeof payload.error === 'string' && payload.error) {
      return { data: null, error: payload.error };
    }

    return { data: (payload as T) ?? null, error: null };
  } catch (err) {
    return {
      data: null,
      error:
        (err as { message?: string })?.message || 'Network error. Please check your connection.',
    };
  }
}

/**
 * Safely returns the signed-in user, or null when nobody is signed in.
 * Reading the session first avoids the library's "Auth session missing!" error
 * being thrown on pages that are simply visited by a guest.
 */
export async function getCurrentUser(): Promise<{ id: string; email?: string } | null> {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData?.session?.user) return null;

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      return sessionData.session.user;
    }

    return data.user;
  } catch {
    return null;
  }
}