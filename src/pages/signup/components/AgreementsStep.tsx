import { useState } from 'react';

interface AgreementsStepProps {
  onBack: () => void;
  onSubmit: () => Promise<string | null>;
}

export default function AgreementsStep({ onBack, onSubmit }: AgreementsStepProps) {
  const [serviceAgreement, setServiceAgreement] = useState(false);
  const [licenseAgreement, setLicenseAgreement] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceAgreement || !licenseAgreement) {
      setError('Please accept both agreements to continue');
      return;
    }

    setError('');
    setLoading(true);
    const message = await onSubmit();
    if (message) setError(message);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Agreements</h2>
      <p className="text-gray-600 mb-8">Please review and accept the following agreements</p>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Netcozy Service Agreement</h3>
          <div className="h-48 overflow-y-auto text-sm text-gray-600 space-y-3 mb-4 pr-2">
            <p className="font-medium">1. Service Terms</p>
            <p>
              By using Netcozy services, you agree to our terms and conditions, including booking
              policies and cancellation rules that apply to each partner service.
            </p>
            <p className="font-medium">2. Membership Benefits</p>
            <p>
              Members receive access to partner hotels, museums, and travel services according to
              their assigned service level.
            </p>
            <p className="font-medium">3. Payment Terms</p>
            <p>All payments are processed securely through our payment partners.</p>
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={serviceAgreement}
              onChange={(e) => setServiceAgreement(e.target.checked)}
              className="w-5 h-5 text-[#1990FF] border-gray-300 rounded focus:ring-[#1990FF] cursor-pointer mt-0.5 flex-shrink-0"
            />
            <span className="text-sm text-gray-700">
              I have read and agree to the Service Agreement
            </span>
          </label>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Licensing Agreement</h3>
          <div className="h-48 overflow-y-auto text-sm text-gray-600 space-y-3 mb-4 pr-2">
            <p className="font-medium">1. Account License</p>
            <p>Your account is licensed for personal use only and may not be resold.</p>
            <p className="font-medium">2. Data Usage</p>
            <p>We collect and process data in accordance with our privacy policy.</p>
            <p className="font-medium">3. Intellectual Property</p>
            <p>All content and materials are protected by copyright.</p>
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={licenseAgreement}
              onChange={(e) => setLicenseAgreement(e.target.checked)}
              className="w-5 h-5 text-[#1990FF] border-gray-300 rounded focus:ring-[#1990FF] cursor-pointer mt-0.5 flex-shrink-0"
            />
            <span className="text-sm text-gray-700">
              I have read and agree to the Licensing Agreement
            </span>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-arrow-left-line mr-2"></i>Back
          </button>
          <button
            type="submit"
            disabled={loading || !serviceAgreement || !licenseAgreement}
            className="flex-1 bg-[#1990FF] text-white py-3 rounded-lg font-medium hover:bg-[#0070E0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
          >
            {loading ? 'Submitting...' : 'Accept and Continue'}
          </button>
        </div>
      </form>
    </div>
  );
}