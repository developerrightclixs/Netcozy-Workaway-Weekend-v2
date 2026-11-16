import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getCurrentUser } from '../../lib/api';

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const planName = searchParams.get('plan') || 'Basic';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Verify payment and update user profile
    const verifyPayment = async () => {
      if (!sessionId) {
        setError('No session ID found');
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        
        if (!currentUser) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        // The webhook will handle updating the user profile
        // Just verify the user is logged in
        setLoading(false);
      } catch (err: any) {
        console.error('Verification error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    verifyPayment();

    // Confetti animation
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Create confetti effect with DOM elements
      for (let i = 0; i < particleCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = randomInRange(0, 100) + '%';
        confetti.style.backgroundColor = ['#0D9488', '#FF6B6B', '#FFD93D', '#6BCB77'][Math.floor(Math.random() * 4)];
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
      }
    }, 250);

    return () => clearInterval(interval);
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0D9488] to-[#0A7A6F] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
          <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6 bg-red-500 rounded-full">
            <i className="ri-close-line text-6xl text-white"></i>
          </div>
          <h1 className="text-4xl font-bold text-[#0A2540] mb-4">Payment Verification Failed</h1>
          <p className="text-xl text-gray-600 mb-8">{error}</p>
          <Link
            to="/pricing"
            className="inline-block px-8 py-4 bg-[#0D9488] text-white rounded-xl font-bold text-lg transition-all hover:bg-[#0A7A6F] whitespace-nowrap"
          >
            Back to Pricing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D9488] to-[#0A7A6F] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center">
        <div className="w-24 h-24 flex items-center justify-center mx-auto mb-6 bg-[#0D9488] rounded-full animate-bounce">
          <i className="ri-check-line text-6xl text-white"></i>
        </div>

        <h1 className="text-5xl font-bold text-[#0A2540] mb-4">Payment Successful!</h1>
        <p className="text-2xl text-gray-600 mb-8">Welcome to Netcozy {planName.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} Membership</p>

        <div className="bg-[#F8F9FA] rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold text-[#0A2540] mb-4">What happens next?</h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 flex items-center justify-center bg-[#0D9488] rounded-full flex-shrink-0">
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A2540] mb-1">Check Your Email</h3>
                <p className="text-gray-600">We've sent a confirmation email with your membership details and receipt.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 flex items-center justify-center bg-[#0D9488] rounded-full flex-shrink-0">
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A2540] mb-1">Access Your Dashboard</h3>
                <p className="text-gray-600">Log in to your account to start exploring exclusive member benefits.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 flex items-center justify-center bg-[#0D9488] rounded-full flex-shrink-0">
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-[#0A2540] mb-1">Start Booking</h3>
                <p className="text-gray-600">Browse hotels, events, and travel experiences at exclusive member prices.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/profile"
            className="px-8 py-4 bg-[#0D9488] text-white rounded-xl font-bold text-lg transition-all hover:bg-[#0A7A6F] whitespace-nowrap"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/"
            className="px-8 py-4 border-2 border-[#0D9488] text-[#0D9488] rounded-xl font-bold text-lg transition-all hover:bg-[#0D9488]/10 whitespace-nowrap"
          >
            Back to Home
          </Link>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Need help? Contact our support team at support@netcozy.com
        </p>
      </div>

      <style>{`
        .confetti {
          position: fixed;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          animation: fall 3s linear forwards;
          pointer-events: none;
        }
        
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
