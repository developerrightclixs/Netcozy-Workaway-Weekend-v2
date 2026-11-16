import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/page'));
const SignUpPage = lazy(() => import('../pages/signup/page'));
const LoginPage = lazy(() => import('../pages/login/page'));
const ForgotPasswordPage = lazy(() => import('../pages/forgot-password/page'));
const ResetPasswordPage = lazy(() => import('../pages/reset-password/page'));
const SetupPage = lazy(() => import('../pages/setup/page'));
const AdminPage = lazy(() => import('../pages/admin/page'));
const TermsPage = lazy(() => import('../pages/terms/page'));
const AboutPage = lazy(() => import('../pages/about/page'));
const MuseumsPage = lazy(() => import('../pages/museums/page'));
const HotelsPage = lazy(() => import('../pages/hotels/page'));
const ProfilePage = lazy(() => import('../pages/profile/page'));
const NotFound = lazy(() => import('../pages/NotFound'));
const PricingPage = lazy(() => import('../pages/pricing/page'));
const CheckoutPage = lazy(() => import('../pages/checkout/page'));
const PaymentSuccessPage = lazy(() => import('../pages/payment-success/page'));
const ConcertsPage = lazy(() => import('../pages/concerts/page'));
const LeadsPage = lazy(() => import('../pages/leads/page'));
const LI3KPage = lazy(() => import('../pages/li3k/page'));
const MoniPage = lazy(() => import('../pages/moni/page'));
const BeachResortsPage = lazy(() => import('../pages/beach-resorts/page'));
const MountainRetreatsPage = lazy(() => import('../pages/mountain-retreats/page'));
const CityBreaksPage = lazy(() => import('../pages/city-breaks/page'));
const BusinessTravelPage = lazy(() => import('../pages/business-travel/page'));
const RomanticGetawaysPage = lazy(() => import('../pages/romantic-getaways/page'));
const FamilyVacationsPage = lazy(() => import('../pages/family-vacations/page'));
const FlightsPage = lazy(() => import('../pages/flights/page'));
const CruisesPage = lazy(() => import('../pages/cruises/page'));
const CarRentalsPage = lazy(() => import('../pages/car-rentals/page'));
const BlockPartyPage = lazy(() => import('../pages/block-party/page'));
const WorkawayPage = lazy(() => import('../pages/workaway/page'));
const SportsEntertainmentPage = lazy(() => import('../pages/sports-entertainment/page'));
const MusicIndustryPage = lazy(() => import('../pages/music-industry/page'));
const CollegesUniversitiesPage = lazy(() => import('../pages/colleges-universities/page'));
const InfluencersPage = lazy(() => import('../pages/influencers/page'));
const ConsumersPage = lazy(() => import('../pages/consumers/page'));
const BusinessPage = lazy(() => import('../pages/business/page'));
const PoliticiansPage = lazy(() => import('../pages/politicians/page'));
const RealEstatePage = lazy(() => import('../pages/real-estate/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/signup',
    element: <SignUpPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />
  },
  {
    path: '/setup',
    element: <SetupPage />
  },
  {
    path: '/admin',
    element: <AdminPage />
  },
  {
    path: '/terms',
    element: <TermsPage />
  },
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/museums',
    element: <MuseumsPage />
  },
  {
    path: '/hotels',
    element: <HotelsPage />
  },
  {
    path: '/profile',
    element: <ProfilePage />
  },
  {
    path: '/pricing',
    element: <PricingPage />
  },
  {
    path: '/checkout',
    element: <CheckoutPage />
  },
  {
    path: '/payment-success',
    element: <PaymentSuccessPage />
  },
  {
    path: '/concerts',
    element: <ConcertsPage />
  },
  {
    path: '/leads',
    element: <LeadsPage />
  },
  {
    path: '/li3k',
    element: <LI3KPage />
  },
  {
    path: '/moni',
    element: <MoniPage />
  },
  {
    path: '/beach-resorts',
    element: <BeachResortsPage />
  },
  {
    path: '/mountain-retreats',
    element: <MountainRetreatsPage />
  },
  {
    path: '/city-breaks',
    element: <CityBreaksPage />,
  },
  {
    path: '/business-travel',
    element: <BusinessTravelPage />,
  },
  {
    path: '/romantic-getaways',
    element: <RomanticGetawaysPage />,
  },
  {
    path: '/family-vacations',
    element: <FamilyVacationsPage />,
  },
  {
    path: '/flights',
    element: <FlightsPage />,
  },
  {
    path: '/cruises',
    element: <CruisesPage />,
  },
  {
    path: '/car-rentals',
    element: <CarRentalsPage />,
  },
  {
    path: '/services/block-party',
    element: <BlockPartyPage />,
  },
  {
    path: '/services/workaway',
    element: <WorkawayPage />,
  },
  {
    path: '/services/colleges-universities',
    element: <CollegesUniversitiesPage />,
  },
  {
    path: '/colleges-universities',
    element: <CollegesUniversitiesPage />,
  },
  {
    path: '/sports-entertainment',
    element: <SportsEntertainmentPage />,
  },
  {
    path: '/music-industry',
    element: <MusicIndustryPage />,
  },
  {
    path: '/influencers',
    element: <InfluencersPage />,
  },
  {
    path: '/consumers',
    element: <ConsumersPage />,
  },
  {
    path: '/business',
    element: <BusinessPage />,
  },
  {
    path: '/politicians',
    element: <PoliticiansPage />,
  },
  {
    path: '/real-estate',
    element: <RealEstatePage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
