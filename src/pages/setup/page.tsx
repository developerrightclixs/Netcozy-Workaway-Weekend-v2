import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SetupPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<any>(null);

  const createSuperadmin = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);
    setResult(null);

    try {
      const response = await fetch(
        'https://fnctmcdycaqaeifiwluy.supabase.co/functions/v1/create-superadmin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuY3RtY2R5Y2FxYWVpZml3bHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMzA4MTcsImV4cCI6MjA4MjYwNjgxN30.uXY8epql0zH9y0_avAV_Ih_jNNW56d8qJrJRGw33k7E',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuY3RtY2R5Y2FxYWVpZml3bHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwMzA4MTcsImV4cCI6MjA4MjYwNjgxN30.uXY8epql0zH9y0_avAV_Ih_jNNW56d8qJrJRGw33k7E'
          }
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to create superadmin');
      }

      setResult(data);
      setSuccess(true);
    } catch (err: any) {
      console.error('Setup error:', err);
      setError(err.message || 'Failed to create superadmin account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D9488] to-[#0A7A6F] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10">
        <div className="flex items-center justify-center gap-3 mb-8">
          <img src="https://storage.readdy-site.link/project_files/029ac680-786b-4603-9848-08fb20ae4f30/d786ac2c-4121-45c7-b4ed-371b6f8287d1_image-12.png?v=6f4af2e64a06407323df94a323e44b9e" alt="Netcozy Logo" className="h-12 w-auto" />
          <span className="text-2xl font-bold text-[#0A2540]">Netcozy</span>
        </div>

        <h2 className="text-3xl font-bold text-[#0A2540] text-center mb-2">System Setup</h2>
        <p className="text-gray-600 text-center mb-8">Create the superadmin account to get started</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl">
            <div className="flex items-start gap-3">
              <i className="ri-error-warning-line text-red-600 text-xl mt-0.5"></i>
              <div className="flex-1">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}

        {success && result && (
          <div className="mb-6 p-6 bg-green-50 border-2 border-green-200 rounded-xl">
            <div className="flex items-start gap-3 mb-4">
              <i className="ri-checkbox-circle-line text-green-600 text-2xl mt-0.5"></i>
              <div className="flex-1">
                <h3 className="text-green-800 text-lg font-bold mb-2">✅ Superadmin Account Created Successfully!</h3>
                <p className="text-green-700 text-sm mb-4">{result.message}</p>
                
                <div className="bg-white p-4 rounded-lg border border-green-300 mb-4">
                  <h4 className="font-bold text-gray-800 mb-3">📋 Login Credentials:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700 w-24">Email:</span>
                      <code className="bg-gray-100 px-3 py-1 rounded text-[#0D9488] font-mono">{result.email}</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700 w-24">Password:</span>
                      <code className="bg-gray-100 px-3 py-1 rounded text-[#0D9488] font-mono">{result.password}</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700 w-24">User ID:</span>
                      <code className="bg-gray-100 px-2 py-1 rounded text-gray-600 font-mono text-xs">{result.userId}</code>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <i className="ri-information-line text-yellow-600 text-lg mt-0.5"></i>
                    <p className="text-yellow-800 text-xs">
                      <strong>Important:</strong> Save these credentials securely. You can now log in to the admin panel.
                    </p>
                  </div>
                </div>

                <Link 
                  to="/login" 
                  className="block w-full py-3 bg-[#0D9488] text-white rounded-xl text-center font-bold hover:bg-[#0A7A6F] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Go to Login Page
                </Link>
              </div>
            </div>
          </div>
        )}

        {!success && (
          <div className="space-y-6">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <i className="ri-information-line text-xl"></i>
                What This Will Do:
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <i className="ri-check-line text-blue-600 mt-0.5"></i>
                  <span>Create a superadmin account with email: <strong>admin@netcozy.com</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-check-line text-blue-600 mt-0.5"></i>
                  <span>Set password to: <strong>123456</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-check-line text-blue-600 mt-0.5"></i>
                  <span>Grant full admin access to manage user applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-check-line text-blue-600 mt-0.5"></i>
                  <span>Automatically approve the account (no verification needed)</span>
                </li>
              </ul>
            </div>

            <button
              onClick={createSuperadmin}
              disabled={loading}
              className="w-full py-4 bg-[#0D9488] text-white rounded-xl text-lg font-bold hover:bg-[#0A7A6F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin mr-2"></i>Creating Superadmin Account...
                </>
              ) : (
                <>
                  <i className="ri-admin-line mr-2"></i>Create Superadmin Account
                </>
              )}
            </button>

            <div className="text-center">
              <Link to="/login" className="text-[#0D9488] font-semibold hover:underline cursor-pointer">
                ← Back to Login
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            <i className="ri-shield-check-line mr-1"></i>
            This is a one-time setup process for system initialization
          </p>
        </div>
      </div>
    </div>
  );
}
