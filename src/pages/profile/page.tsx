import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { fetchMyProfile, getCurrentUser, type UserProfileData } from '@/lib/api';
import ShareButton from '@/components/base/ShareButton';

interface MembershipPlan {
  key: string;
  title: string;
  value: string;
  perks: string[];
  accentClass: string;
}

const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    key: 'basic',
    title: 'Basic Membership',
    value: 'Value: $180 - $500 max',
    perks: ['Event tickets', 'Travel services up to $180-$500 max per account'],
    accentClass: 'bg-gray-100',
  },
  {
    key: 'mid_level',
    title: 'Mid Level Membership',
    value: 'Value: $500 - $1,200 max',
    perks: ['Event tickets', 'Airfare services', 'Cruise bookings', 'Rental cars', 'Hotels and resorts'],
    accentClass: 'bg-primary-100',
  },
  {
    key: 'all_access',
    title: 'All Access Membership',
    value: 'Value: $1,200 - $2,500 max',
    perks: ['Event tickets', 'All travel services from Basic and Mid Level', 'VIP giveaways'],
    accentClass: 'bg-accent-100',
  },
  {
    key: 'all_access_vip',
    title: 'All Access VIP Membership',
    value: 'Value: $10,000 and up',
    perks: [
      'All event and travel services from lower packages',
      'Five-star resort access',
      'Five-star travel experiences',
      'Free VIP membership with LI3K or MONI service sign-up',
    ],
    accentClass: 'bg-amber-100',
  },
];

const formatLevel = (level: string) =>
  MEMBERSHIP_PLANS.find((plan) => plan.key === level)?.title ??
  `${level.charAt(0).toUpperCase()}${level.slice(1)} Plan`;

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProfile = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        navigate('/login');
        return;
      }

      const { data, error: profileError } = await fetchMyProfile();
      if (profileError || !data?.profile) {
        setError(profileError || 'Unable to load your profile right now.');
        return;
      }

      setProfile(data.profile);
    } catch (err) {
      setError((err as { message?: string })?.message || 'Unable to load your profile right now.');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent mb-4"></div>
          <p className="text-foreground-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-background-50 flex items-center justify-center p-6">
        <div className="bg-background-50 rounded-lg border border-background-200 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-error-warning-line text-3xl text-red-600"></i>
          </div>
          <h2 className="text-2xl font-bold text-foreground-950 mb-2">Profile Unavailable</h2>
          <p className="text-foreground-600 mb-6">{error || 'We could not load your profile.'}</p>
          <div className="flex gap-3">
            <button
              onClick={loadProfile}
              className="flex-1 px-6 py-3 bg-primary-500 text-background-50 rounded-md font-semibold hover:bg-primary-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-refresh-line mr-2"></i>Try Again
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 px-6 py-3 bg-background-200 text-foreground-800 rounded-md font-semibold hover:bg-background-300 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-logout-box-line mr-2"></i>Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  const plan = MEMBERSHIP_PLANS.find((item) => item.key === profile.service_level);

  const details: Array<{ label: string; value: string }> = [
    { label: 'Full Name', value: profile.full_name || 'Not provided' },
    { label: 'Email', value: profile.email },
    { label: 'Phone Number', value: profile.phone_number || 'Not provided' },
    { label: 'Cell Number', value: profile.cell_number || 'Not provided' },
    { label: 'Gender', value: profile.sex || 'Not provided' },
    { label: 'Street Address', value: profile.street_address || 'Not provided' },
    { label: 'City', value: profile.city || 'Not provided' },
    { label: 'State', value: profile.state || 'Not provided' },
    { label: 'ZIP Code', value: profile.zip_code || 'Not provided' },
    { label: 'Country', value: profile.country || 'Not provided' },
    {
      label: 'Member Since',
      value: new Date(profile.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    },
  ];

  if (profile.approved_at) {
    details.push({
      label: 'Approved On',
      value: new Date(profile.approved_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    });
  }

  return (
    <div className="min-h-screen bg-background-50">
      <header className="bg-background-50 border-b border-background-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://storage.readdy-site.link/project_files/029ac680-786b-4603-9848-08fb20ae4f30/d786ac2c-4121-45c7-b4ed-371b6f8287d1_image-12.png?v=6f4af2e64a06407323df94a323e44b9e"
              alt="Netcozy"
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-foreground-950">Netcozy</span>
          </Link>
          <div className="flex items-center gap-4">
            <ShareButton
              title="My Netcozy Profile"
              text="Check out my profile on Netcozy - Premium travel and networking experiences"
            />
            <Link to="/museums" className="px-4 py-2 text-foreground-600 hover:text-foreground-900 font-medium whitespace-nowrap cursor-pointer">
              Museums
            </Link>
            <Link to="/hotels" className="px-4 py-2 text-foreground-600 hover:text-foreground-900 font-medium whitespace-nowrap cursor-pointer">
              Hotels
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-red-600 hover:text-red-700 font-medium whitespace-nowrap cursor-pointer"
            >
              <i className="ri-logout-box-line mr-2"></i>Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-background-50 rounded-lg border border-background-200 p-8 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center text-background-50 font-bold text-3xl">
                {(profile.full_name || profile.email || 'U').charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground-950 mb-1">
                  {profile.full_name || 'Complete your profile'}
                </h1>
                <p className="text-foreground-600">{profile.email}</p>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  profile.approval_status === 'approved'
                    ? 'bg-green-100 text-green-700'
                    : profile.approval_status === 'rejected'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-amber-100 text-amber-700'
                }`}
              >
                {profile.approval_status.charAt(0).toUpperCase() + profile.approval_status.slice(1)}
              </span>
              {profile.service_level && (
                <span className="px-4 py-2 bg-secondary-500 text-background-50 rounded-full text-sm font-semibold">
                  {formatLevel(profile.service_level)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-background-50 rounded-lg border border-background-200 p-8">
          <h2 className="text-2xl font-bold text-foreground-950 mb-6">Profile Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {details.map((item) => (
              <div key={item.label} className="min-w-0">
                <label className="block text-sm font-semibold text-foreground-500 mb-2">{item.label}</label>
                <p className="text-lg text-foreground-900 break-words">{item.value}</p>
              </div>
            ))}
          </div>

          {plan && (
            <div className="mt-8 pt-8 border-t border-background-200">
              <h3 className="text-xl font-bold text-foreground-950 mb-4">Membership Benefits</h3>
              <div className={`${plan.accentClass} rounded-lg p-6`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                    <i className="ri-vip-crown-line text-2xl text-background-50"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground-950">{plan.title}</h4>
                    <p className="text-sm text-foreground-700">{plan.value}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2">
                      <i className="ri-check-line text-green-600 mt-1"></i>
                      <span className="text-foreground-800">{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}