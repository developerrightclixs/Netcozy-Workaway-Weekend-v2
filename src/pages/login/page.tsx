import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { buildProfileFromUser } from '@/lib/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const provider = session.user.app_metadata?.provider;
      if (provider !== 'google') return;

      const profile = buildProfileFromUser(session.user);

      if (profile.approval_status === 'rejected') {
        setError('Your account application was not approved. Please contact support.');
        await supabase.auth.signOut();
        return;
      }

      if (!profile.signup_completed) {
        navigate('/signup');
        return;
      }

      navigate(profile.role === 'superadmin' ? '/admin' : '/profile');
    };

    handleOAuthCallback();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        throw new Error(
          /invalid|credentials/i.test(authError.message)
            ? 'Incorrect email or password. Please try again.'
            : authError.message,
        );
      }

      if (!authData.user) {
        throw new Error('Login failed. Please try again.');
      }

      const profile = buildProfileFromUser(authData.user);

      if (profile.approval_status === 'rejected') {
        setError('Your account has been rejected. Please contact support.');
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      if (!profile.signup_completed) {
        navigate('/signup');
        return;
      }

      navigate(profile.role === 'superadmin' ? '/admin' : '/profile');
    } catch (err) {
      setError((err as { message?: string })?.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);

      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/login`,
          queryParams: { access_type: 'offline', prompt: 'consent' },
        },
      });

      if (oauthError) {
        setError('Google sign-in is not available right now. Please use your email and password.');
        setLoading(false);
      }
    } catch {
      setError('Google sign-in is not available right now. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <img src="https://storage.readdy-site.link/project_files/029ac680-786b-4603-9848-08fb20ae4f30/d786ac2c-4121-45c7-b4ed-371b6f8287d1_image-12.png?v=6f4af2e64a06407323df94a323e44b9e" alt="Netcozy Logo" className="h-16 w-auto" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to access your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <i className="ri-error-warning-line text-red-500 text-xl flex-shrink-0 mt-0.5"></i>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#1990FF] transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#1990FF] transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-xl`}></i>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#1990FF] border-gray-300 rounded focus:ring-[#1990FF] cursor-pointer"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-[#1990FF] font-semibold hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#1990FF] text-white rounded-xl text-lg font-bold hover:bg-[#0070E0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-2"></i>Logging in...
                </>
              ) : (
                'Log In'
              )}
            </button>
          </form>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="mt-4 w-full py-3.5 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-google-fill mr-2"></i>Continue with Google
          </button>

          <p className="text-center text-gray-600 mt-6">
            Don't have an account? <Link to="/signup" className="text-[#1990FF] font-semibold hover:underline cursor-pointer">Sign up</Link>
          </p>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-500">
              <i className="ri-information-line mr-1"></i>
              New accounts are reviewed before activation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}