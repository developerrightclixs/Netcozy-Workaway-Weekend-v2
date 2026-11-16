import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { buildProfileFromUser, emptyProfileFields, saveMyProfile } from '@/lib/api';
import type { SignupDetails } from '@/pages/signup/types';
import DetailsStep from '@/pages/signup/components/DetailsStep';
import VerifyStep from '@/pages/signup/components/VerifyStep';
import AgreementsStep from '@/pages/signup/components/AgreementsStep';

const STEP_LABELS = ['Account', 'Details', 'Verify', 'Agreements', 'Approval'];

export default function SignUpPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [details, setDetails] = useState<Partial<SignupDetails>>({});

  // Anyone arriving with an existing session resumes at the details step
  // instead of being asked to create a second account.
  useEffect(() => {
    let active = true;

    const resume = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data?.session?.user;
      if (!user || !active) return;

      const profile = buildProfileFromUser(user);
      if (profile.signup_completed) {
        navigate('/profile');
        return;
      }

      setUserId(user.id);
      setEmail(user.email ?? '');
      setDetails({
        fullName: profile.full_name,
        phoneNumber: profile.phone_number,
        cellNumber: profile.cell_number,
        sex: profile.sex,
        streetAddress: profile.street_address,
        city: profile.city,
        state: profile.state,
        zipCode: profile.zip_code,
        country: profile.country,
        dateOfBirth: profile.date_of_birth ?? '',
        nationality: profile.nationality,
        passportNumber: profile.passport_number,
        interestedInReferral: profile.interested_in_referral,
      });
      setCurrentStep(2);
    };

    resume();
    return () => {
      active = false;
    };
  }, [navigate]);

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNotice('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: { profile: emptyProfileFields(cleanEmail) },
        },
      });

      if (signUpError) {
        const message = signUpError.message || '';
        setError(
          /already|exist|registered|duplicate/i.test(message)
            ? 'This email is already registered. Please sign in instead.'
            : message,
        );
        return;
      }

      const created = data?.user;
      if (!created) {
        setError('We could not create your account. Please try again.');
        return;
      }

      if (Array.isArray(created.identities) && created.identities.length === 0) {
        setError('This email is already registered. Please sign in instead.');
        return;
      }

      setUserId(created.id);
      setEmail(cleanEmail);
      setPassword('');
      setConfirmPassword('');

      if (!data?.session) {
        setNotice(
          'Your account was created. We sent a confirmation email — once you confirm it, sign in to finish your profile.',
        );
        return;
      }

      setCurrentStep(2);
    } catch (err) {
      setError(
        (err as { message?: string })?.message || 'We could not create your account right now.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsSubmit = async (values: SignupDetails): Promise<string | null> => {
    const { error: saveError } = await saveMyProfile({
      full_name: values.fullName,
      phone_number: values.phoneNumber,
      cell_number: values.cellNumber,
      sex: values.sex,
      street_address: values.streetAddress,
      city: values.city,
      state: values.state,
      zip_code: values.zipCode,
      country: values.country,
      date_of_birth: values.dateOfBirth,
      nationality: values.nationality,
      passport_number: values.passportNumber,
      interested_in_referral: values.interestedInReferral,
    });

    if (saveError) return saveError;

    setDetails(values);
    setCurrentStep(3);
    return null;
  };

  const handleVerifyContinue = async (idDocumentName: string) => {
    if (idDocumentName) {
      await saveMyProfile({ id_document_name: idDocumentName });
    }
    setCurrentStep(4);
  };

  const handleAgreementsSubmit = async (): Promise<string | null> => {
    const { error: saveError } = await saveMyProfile({
      agreements_signed_at: new Date().toISOString(),
      signup_completed: true,
      approval_status: 'pending',
    });

    if (saveError) return saveError;

    setCurrentStep(5);
    return null;
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://storage.readdy-site.link/project_files/029ac680-786b-4603-9848-08fb20ae4f30/d786ac2c-4121-45c7-b4ed-371b6f8287d1_image-12.png?v=6f4af2e64a06407323df94a323e44b9e"
              alt="Netcozy Logo"
              className="h-10 w-auto"
            />
            <span className="text-xl font-semibold text-gray-900">Netcozy</span>
          </Link>
          <Link
            to="/login"
            className="text-sm text-gray-600 hover:text-[#1990FF] transition-colors whitespace-nowrap"
          >
            Already have an account? Sign In
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-12">
        <div className="mb-10 md:mb-12">
          <div className="flex items-center justify-between">
            {STEP_LABELS.map((label, index) => {
              const step = index + 1;
              return (
                <div key={label} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        currentStep >= step
                          ? 'bg-[#1990FF] text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {step}
                    </div>
                    <span className="text-xs mt-2 text-gray-600 whitespace-nowrap">{label}</span>
                  </div>
                  {step < STEP_LABELS.length && (
                    <div
                      className={`h-1 flex-1 mx-1 md:mx-2 transition-all ${
                        currentStep > step ? 'bg-[#1990FF]' : 'bg-gray-100'
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}
        {notice && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-start justify-between gap-3">
            <span>{notice}</span>
            {!userId && (
              <Link
                to="/login"
                className="font-semibold underline whitespace-nowrap cursor-pointer flex-shrink-0"
              >
                Go to sign in
              </Link>
            )}
          </div>
        )}

        {currentStep === 1 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
            <p className="text-gray-600 mb-8">
              Join Netcozy to access exclusive travel services
            </p>

            <form onSubmit={handleStep1Submit} className="space-y-6">
              <div className="min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1990FF] text-sm"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1990FF] text-sm"
                  placeholder="Minimum 6 characters"
                  required
                />
              </div>

              <div className="min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1990FF] text-sm"
                  placeholder="Re-enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1990FF] text-white py-3 rounded-lg font-medium hover:bg-[#0070E0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                {loading ? 'Creating Account...' : 'Continue'}
              </button>
            </form>
          </div>
        )}

        {currentStep === 2 && (
          <DetailsStep
            initial={details}
            onBack={() => setCurrentStep(1)}
            onSubmit={handleDetailsSubmit}
          />
        )}

        {currentStep === 3 && (
          <VerifyStep
            email={email}
            userId={userId}
            onBack={() => setCurrentStep(2)}
            onContinue={handleVerifyContinue}
          />
        )}

        {currentStep === 4 && (
          <AgreementsStep onBack={() => setCurrentStep(3)} onSubmit={handleAgreementsSubmit} />
        )}

        {currentStep === 5 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-time-line text-4xl text-[#1990FF]"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Pending Approval</h2>
            <p className="text-gray-600 mb-8">
              Thank you for completing your registration! Your application is now under review.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">What Happens Next?</h3>
              <div className="space-y-4">
                {[
                  ['Partner Verification', 'We verify your information with our partners'],
                  ['Admin Review', 'Our team reviews your application (2-3 business days)'],
                  ['Service Level Assignment', "You'll receive your membership tier notification"],
                  ['Start Exploring', 'Access exclusive hotels, museums, and services'],
                ].map(([title, description], index) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-8 h-8 bg-[#1990FF] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-sm">{index + 1}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900">{title}</p>
                      <p className="text-sm text-gray-600">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/profile"
                className="px-8 py-3 bg-[#1990FF] text-white rounded-lg font-medium hover:bg-[#0070E0] transition-colors whitespace-nowrap cursor-pointer"
              >
                View My Account
              </Link>
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 border-2 border-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                Return to Homepage
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-6">Questions? Contact us at support@netcozy.com</p>
          </div>
        )}
      </div>
    </div>
  );
}