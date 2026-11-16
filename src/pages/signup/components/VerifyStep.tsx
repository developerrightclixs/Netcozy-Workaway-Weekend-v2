import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface VerifyStepProps {
  email: string;
  userId: string;
  onBack: () => void;
  onContinue: (idDocumentName: string) => void;
}

const MAX_FILE_BYTES = 8 * 1024 * 1024;

const safeFileName = (original: string) => {
  const extension = (original.split('.').pop() ?? 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
  return `${Date.now()}-document.${extension || 'jpg'}`;
};

export default function VerifyStep({ email, userId, onBack, onContinue }: VerifyStepProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [checking, setChecking] = useState(false);
  const [resending, setResending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedName, setUploadedName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshStatus = async () => {
    setChecking(true);
    try {
      const { data } = await supabase.auth.getUser();
      setConfirmed(Boolean(data?.user?.email_confirmed_at));
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    refreshStatus();
  }, []);

  const handleResend = async () => {
    setError('');
    setNotice('');
    setResending(true);
    try {
      const { error: resendError } = await supabase.auth.resend({ type: 'signup', email });
      if (resendError) {
        setError(
          'We could not send a confirmation email yet. Email delivery is still being set up, so you can continue without it.',
        );
      } else {
        setNotice('Confirmation email sent. Check your inbox.');
      }
    } catch {
      setError('We could not send a confirmation email yet. You can continue without it.');
    } finally {
      setResending(false);
    }
  };

  const uploadFile = async (file: File) => {
    setError('');
    setNotice('');

    if (file.size > MAX_FILE_BYTES) {
      setError('Please choose a file smaller than 8 MB.');
      return;
    }

    setUploading(true);
    try {
      const path = `${userId}/${safeFileName(file.name)}`;
      const { error: uploadError } = await supabase.storage
        .from('id-documents')
        .upload(path, file, { contentType: file.type || 'application/octet-stream', upsert: false });

      if (uploadError) {
        setError(
          'Your ID could not be stored just yet. You can continue and add it later from your profile.',
        );
        return;
      }

      setUploadedName(file.name);
      setNotice('ID document attached to your application.');
    } catch {
      setError('Your ID could not be stored just yet. You can continue and add it later.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
      <p className="text-gray-600 mb-8">Confirm your address and attach a government-issued ID</p>

      {error && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm flex items-start gap-3">
          <i className="ri-information-line text-lg flex-shrink-0"></i>
          <span>{error}</span>
        </div>
      )}
      {notice && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          {notice}
        </div>
      )}

      <div className="border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 mb-1">Email address</p>
            <p className="text-sm text-gray-600 break-all">{email}</p>
          </div>
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
              confirmed ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
            }`}
          >
            {confirmed ? 'Confirmed' : 'Not confirmed yet'}
          </span>
        </div>

        <div className="flex flex-wrap gap-3 mt-5">
          <button
            type="button"
            onClick={refreshStatus}
            disabled={checking}
            className="px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap disabled:opacity-50 cursor-pointer"
          >
            <i className={`ri-refresh-line mr-2 ${checking ? 'animate-spin' : ''}`}></i>
            Check again
          </button>
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="px-4 py-2.5 border-2 border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap disabled:opacity-50 cursor-pointer"
          >
            {resending ? 'Sending...' : 'Resend confirmation email'}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Government-Issued ID <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <p className="text-xs text-gray-500 mb-4">
          Accepted: Driver&apos;s License, Passport, or National ID
        </p>

        <div
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) uploadFile(file);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            isDragging ? 'border-[#1990FF] bg-blue-50' : 'border-gray-200 hover:border-[#1990FF]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadFile(file);
            }}
            className="hidden"
          />
          {uploading ? (
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <i className="ri-loader-4-line animate-spin text-2xl"></i>
              <span className="text-sm">Uploading...</span>
            </div>
          ) : uploadedName ? (
            <div className="flex items-center justify-center gap-3 min-w-0">
              <i className="ri-file-check-line text-3xl text-[#1990FF]"></i>
              <p className="font-medium text-gray-900 text-sm break-all">{uploadedName}</p>
            </div>
          ) : (
            <>
              <i className="ri-upload-cloud-2-line text-4xl text-gray-400 mb-3"></i>
              <p className="text-gray-600 mb-1 text-sm">Drag and drop your ID here</p>
              <p className="text-sm text-gray-400">or click to browse</p>
            </>
          )}
        </div>
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
          type="button"
          onClick={() => onContinue(uploadedName)}
          className="flex-1 py-3 bg-[#1990FF] text-white rounded-lg font-medium hover:bg-[#0070E0] transition-colors whitespace-nowrap cursor-pointer"
        >
          Continue to Agreements<i className="ri-arrow-right-line ml-2"></i>
        </button>
      </div>
    </div>
  );
}