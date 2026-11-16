
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SUPABASE_URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/request-password-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset email');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
              <i className="ri-building-4-line text-xl text-white"></i>
            </div>
            <span className="text-xl font-semibold text-gray-900">Netcozy</span>
          </Link>
          <Link to="/login" className="text-sm text-gray-600 hover:text-teal-500 transition-colors">
            Back to Login
          </Link>
        </div>
      </header>

      <div className="max-w-md mx-auto px-6 py-16">
        {success ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-mail-check-line text-3xl text-teal-500"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
            <p className="text-gray-600 mb-8">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-gray-600 mb-2">
                <i className="ri-information-line text-teal-500 mr-2"></i>
                Click the link in the email to reset your password
              </p>
              <p className="text-sm text-gray-600">
                <i className="ri-time-line text-teal-500 mr-2"></i>
                The link will expire in 1 hour
              </p>
            </div>
            <Link
              to="/login"
              className="inline-block bg-teal-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-teal-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-lock-password-line text-3xl text-teal-500"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
              <p className="text-gray-600">
                No worries! Enter your email and we'll send you reset instructions
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-500 text-white py-3 rounded-lg font-medium hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>

              <div className="text-center">
                <Link
                  to="/login"
                  className="text-sm text-gray-600 hover:text-teal-500 transition-colors"
                >
                  <i className="ri-arrow-left-line mr-1"></i>
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
