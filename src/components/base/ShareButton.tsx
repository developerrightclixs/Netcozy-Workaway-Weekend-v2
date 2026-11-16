import { useState } from 'react';

interface ShareButtonProps {
  title?: string;
  text?: string;
  className?: string;
}

export default function ShareButton({ 
  title = 'Check out Netcozy', 
  text = 'Discover amazing travel experiences and exclusive events',
  className = ''
}: ShareButtonProps) {
  const [showCopied, setShowCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const currentUrl = window.location.href;

  const handleShare = async () => {
    // Check if Web Share API is available (mobile devices)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: currentUrl,
        });
      } catch (err) {
        console.log('Share cancelled or failed:', err);
      }
    } else {
      // Desktop: show share menu
      setShowShareMenu(!showShareMenu);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setShowCopied(true);
      setTimeout(() => {
        setShowCopied(false);
        setShowShareMenu(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${text}\n\n${currentUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
    setShowShareMenu(false);
  };

  const shareViaFacebook = () => {
    const url = encodeURIComponent(currentUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const shareViaTwitter = () => {
    const url = encodeURIComponent(currentUrl);
    const textToShare = encodeURIComponent(text);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${textToShare}`, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const shareViaLinkedIn = () => {
    const url = encodeURIComponent(currentUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const shareViaWhatsApp = () => {
    const url = encodeURIComponent(currentUrl);
    const textToShare = encodeURIComponent(`${text} ${currentUrl}`);
    window.open(`https://wa.me/?text=${textToShare}`, '_blank');
    setShowShareMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className={`flex items-center gap-2 px-4 py-2 bg-[#1990FF] text-white rounded-lg font-medium hover:bg-[#0070E0] transition-colors whitespace-nowrap cursor-pointer ${className}`}
      >
        <i className="ri-share-line"></i>
        Share
      </button>

      {/* Desktop Share Menu */}
      {showShareMenu && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowShareMenu(false)}
          ></div>
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
            <div className="p-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-900">Share this page</p>
            </div>
            
            <div className="p-2">
              <button
                onClick={copyToClipboard}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer text-left"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <i className="ri-file-copy-line text-lg text-gray-700"></i>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Copy Link</p>
                  {showCopied && (
                    <p className="text-xs text-green-600">✓ Copied!</p>
                  )}
                </div>
              </button>

              <button
                onClick={shareViaEmail}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer text-left"
              >
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <i className="ri-mail-line text-lg text-red-600"></i>
                </div>
                <p className="text-sm font-medium text-gray-900">Email</p>
              </button>

              <button
                onClick={shareViaFacebook}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer text-left"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-facebook-fill text-lg text-blue-600"></i>
                </div>
                <p className="text-sm font-medium text-gray-900">Facebook</p>
              </button>

              <button
                onClick={shareViaTwitter}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer text-left"
              >
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                  <i className="ri-twitter-fill text-lg text-sky-600"></i>
                </div>
                <p className="text-sm font-medium text-gray-900">Twitter</p>
              </button>

              <button
                onClick={shareViaLinkedIn}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer text-left"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-linkedin-fill text-lg text-blue-700"></i>
                </div>
                <p className="text-sm font-medium text-gray-900">LinkedIn</p>
              </button>

              <button
                onClick={shareViaWhatsApp}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer text-left"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="ri-whatsapp-fill text-lg text-green-600"></i>
                </div>
                <p className="text-sm font-medium text-gray-900">WhatsApp</p>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
