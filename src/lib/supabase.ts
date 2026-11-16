import { createClient } from '@supabase/supabase-js';

// The configured address may end with a slash; stripping it prevents doubled
// slashes in auth and function requests, which the backend rejects.
const supabaseUrl = (import.meta.env.VITE_PUBLIC_SUPABASE_URL ?? '').replace(/\/+$/, '');
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    fetch: (...args) => {
      return fetch(...args).catch((err) => {
        console.warn('Supabase fetch error (network issue or session expired):', err?.message);
        return Promise.reject(err);
      });
    },
  },
});

// Handle auth errors globally to prevent app crashes on token refresh failure
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'TOKEN_REFRESHED') {
    // Token refreshed successfully
  }
  if (event === 'SIGNED_OUT') {
    // Session ended — clear any local state if needed
  }
});