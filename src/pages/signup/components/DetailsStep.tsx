import { useState } from 'react';
import type { SignupDetails } from '@/pages/signup/types';

interface DetailsStepProps {
  initial?: Partial<SignupDetails>;
  onBack: () => void;
  onSubmit: (details: SignupDetails) => Promise<string | null>;
}

const alphaOnly = (value: string) => value.replace(/[^a-zA-Z\s]/g, '');
const numericOnly = (value: string) => value.replace(/[^0-9]/g, '');

const fieldClass =
  'w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#1990FF] transition-colors text-sm';

export default function DetailsStep({ initial, onBack, onSubmit }: DetailsStepProps) {
  const [fullName, setFullName] = useState(initial?.fullName ?? '');
  const [dateOfBirth, setDateOfBirth] = useState(initial?.dateOfBirth ?? '');
  const [sex, setSex] = useState(initial?.sex ?? '');
  const [nationality, setNationality] = useState(initial?.nationality ?? '');
  const [passportNumber, setPassportNumber] = useState(initial?.passportNumber ?? '');
  const [phoneNumber, setPhoneNumber] = useState(initial?.phoneNumber ?? '');
  const [cellNumber, setCellNumber] = useState(initial?.cellNumber ?? '');
  const [streetAddress, setStreetAddress] = useState(initial?.streetAddress ?? '');
  const [city, setCity] = useState(initial?.city ?? '');
  const [stateName, setStateName] = useState(initial?.state ?? '');
  const [zipCode, setZipCode] = useState(initial?.zipCode ?? '');
  const [country, setCountry] = useState(initial?.country ?? '');
  const [interestedInReferral, setInterestedInReferral] = useState(
    initial?.interestedInReferral ?? false,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const message = await onSubmit({
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      cellNumber: cellNumber.trim(),
      sex,
      streetAddress: streetAddress.trim(),
      city: city.trim(),
      state: stateName.trim(),
      zipCode: zipCode.trim(),
      country: country.trim(),
      dateOfBirth,
      nationality: nationality.trim(),
      passportNumber: passportNumber.trim(),
      interestedInReferral,
    });

    if (message) setError(message);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Your Profile</h2>
      <p className="text-gray-600 mb-8">Tell us more about yourself</p>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="min-w-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(alphaOnly(e.target.value))}
                className={fieldClass}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="min-w-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className={fieldClass}
                required
              />
            </div>

            <div className="min-w-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sex <span className="text-red-500">*</span>
              </label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                className={fieldClass}
                required
              >
                <option value="">Select</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="min-w-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nationality <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={nationality}
                onChange={(e) => setNationality(alphaOnly(e.target.value))}
                className={fieldClass}
                placeholder="Enter your nationality"
                required
              />
            </div>

            <div className="min-w-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passport Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={passportNumber}
                onChange={(e) => setPassportNumber(e.target.value)}
                className={fieldClass}
                placeholder="Enter passport number"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Contact Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="min-w-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(numericOnly(e.target.value))}
                className={fieldClass}
                placeholder="5551234567"
                required
              />
            </div>

            <div className="min-w-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cell Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={cellNumber}
                onChange={(e) => setCellNumber(numericOnly(e.target.value))}
                className={fieldClass}
                placeholder="5551234567"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Address Information</h3>

          <div className="space-y-4">
            <div className="min-w-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                className={fieldClass}
                placeholder="123 Main Street"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={fieldClass}
                  placeholder="Enter city"
                  required
                />
              </div>

              <div className="min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State/Province <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className={fieldClass}
                  placeholder="Enter state"
                  required
                />
              </div>

              <div className="min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zip/Postal Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(numericOnly(e.target.value))}
                  className={fieldClass}
                  placeholder="12345"
                  required
                />
              </div>

              <div className="min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className={fieldClass}
                  placeholder="Enter country"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={interestedInReferral}
              onChange={(e) => setInterestedInReferral(e.target.checked)}
              className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer mt-1 flex-shrink-0"
            />
            <div>
              <p className="text-sm font-medium text-gray-900 mb-1">
                If you would like to work with us and make $30 to $100 per person that signs up for
                our free services, please indicate here
              </p>
              <p className="text-xs text-gray-600">
                Join our referral program and earn rewards for every successful signup
              </p>
            </div>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            <i className="ri-arrow-left-line mr-2"></i>Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-4 bg-[#1990FF] text-white rounded-lg font-medium hover:bg-[#0070E0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
          >
            {loading ? (
              <>
                <i className="ri-loader-4-line animate-spin mr-2"></i>Saving...
              </>
            ) : (
              <>
                Continue<i className="ri-arrow-right-line ml-2"></i>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}