import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

interface Performer {
  id: number;
  name: string;
  image: string;
  num_upcoming_events: number;
  slug: string;
}

interface Event {
  id: number;
  title: string;
  datetime_local: string;
  venue: {
    name: string;
    city: string;
    state: string;
  };
  performers: Array<{
    name: string;
    image: string;
  }>;
  url: string;
}

export default function ConcertsPage() {
  const [activeTab, setActiveTab] = useState<'performers' | 'events'>('performers');
  const [performers, setPerformers] = useState<Performer[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [errorDetails, setErrorDetails] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPerformers();
    fetchEvents();
  }, []);

  const handleViewEvents = (slug: string) => {
    const url = `https://seatgeek.com/${slug}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleGetTickets = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const fetchPerformers = async () => {
    setLoading(true);
    setError('');
    setErrorDetails(null);
    
    try {
      console.log('🔄 Fetching performers from SeatGeek API...');
      
      // Use the correct SeatGeek client ID format
      const clientId = 'NTUzNjc2Mzl8MTc2ODI1ODg4NS4zODQxNjAz';
      
      const response = await fetch(`https://api.seatgeek.com/2/performers?client_id=${clientId}&per_page=12&taxonomies.name=concert`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      console.log('📊 Response Status:', response.status);
      console.log('📊 Response Status Text:', response.statusText);

      const responseText = await response.text();
      console.log('📄 Raw Response:', responseText.substring(0, 500));

      if (!response.ok) {
        const errorData = {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          body: responseText
        };
        
        setErrorDetails(errorData);
        
        throw new Error(`API Error ${response.status}: ${response.statusText}\n\nResponse: ${responseText}`);
      }

      const data = JSON.parse(responseText);
      console.log('✅ Parsed Data - Performers count:', data.performers?.length);

      if (data.performers && Array.isArray(data.performers)) {
        setPerformers(data.performers.slice(0, 12));
        console.log('✅ Loaded performers:', data.performers.length);
      } else {
        console.warn('⚠️ No performers array in response');
        setPerformers([]);
      }
    } catch (err: any) {
      console.error('❌ Error fetching performers:', err);
      setError(err.message || 'Failed to load performers');
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      console.log('🔄 Fetching events from SeatGeek API...');
      
      // Use the correct SeatGeek client ID format
      const clientId = 'NTUzNjc2Mzl8MTc2ODI1ODg4NS4zODQxNjAz';
      
      // Get current date in YYYY-MM-DD format for filtering future events
      const today = new Date();
      const dateString = today.toISOString().split('T')[0];
      
      console.log('📅 Filtering events from:', dateString);
      
      const response = await fetch(`https://api.seatgeek.com/2/events?client_id=${clientId}&per_page=20&taxonomies.name=concert&datetime_local.gte=${dateString}&sort=datetime_local.asc`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      console.log('📊 Events Response Status:', response.status);

      const responseText = await response.text();
      console.log('📄 Events Raw Response:', responseText.substring(0, 500));

      if (!response.ok) {
        console.error('❌ Events API Error:', response.status, responseText);
        return;
      }

      const data = JSON.parse(responseText);
      console.log('✅ Events Parsed Data - Events count:', data.events?.length);

      if (data.events && Array.isArray(data.events)) {
        // Filter out any past events just to be safe
        const upcomingEvents = data.events.filter((event: Event) => {
          const eventDate = new Date(event.datetime_local);
          return eventDate >= today;
        });
        
        setEvents(upcomingEvents.slice(0, 20));
        console.log('✅ Loaded upcoming events:', upcomingEvents.length);
      }
    } catch (err: any) {
      console.error('❌ Error fetching events:', err);
    }
  };

  const filteredPerformers = performers.filter(performer =>
    performer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Live Concerts & Events
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Discover amazing live performances and get tickets to the hottest concerts and events
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto px-4">
            <div className="relative">
              <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg sm:text-xl"></i>
              <input
                type="text"
                placeholder="Search for artists, bands, or events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1990FF] text-sm sm:text-base"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Error Display */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <i className="ri-error-warning-line text-2xl sm:text-3xl text-red-500 flex-shrink-0"></i>
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-red-900 mb-2">API Connection Issue</h3>
                <div className="bg-white rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 overflow-x-auto">
                  <p className="text-xs sm:text-sm text-red-800 font-mono whitespace-pre-wrap break-words">{error}</p>
                </div>
                
                {errorDetails && (
                  <div className="space-y-2 sm:space-y-3">
                    <div className="bg-white rounded-lg p-3 sm:p-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Status Code:</p>
                      <p className="text-xs sm:text-sm font-mono text-gray-900">{errorDetails.status} - {errorDetails.statusText}</p>
                    </div>
                    
                    <div className="bg-white rounded-lg p-3 sm:p-4">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Response Body:</p>
                      <pre className="text-xs font-mono text-gray-900 overflow-x-auto whitespace-pre-wrap break-words">{errorDetails.body}</pre>
                    </div>
                  </div>
                )}

                <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
                  <p className="text-xs sm:text-sm text-blue-900 font-semibold mb-2">💡 Note:</p>
                  <p className="text-xs sm:text-sm text-blue-800">
                    This is using the SeatGeek public API. If you continue to see authentication errors, you may need to register for your own API credentials at{' '}
                    <a href="https://seatgeek.com/build" target="_blank" rel="noopener noreferrer" className="underline font-semibold">
                      seatgeek.com/build
                    </a>
                  </p>
                </div>

                <button
                  onClick={() => {
                    setError('');
                    setErrorDetails(null);
                    fetchPerformers();
                    fetchEvents();
                  }}
                  className="mt-3 sm:mt-4 bg-red-500 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-red-600 transition-colors whitespace-nowrap cursor-pointer text-sm sm:text-base w-full sm:w-auto"
                >
                  <i className="ri-refresh-line mr-2"></i>
                  Retry Connection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center gap-2 sm:gap-4 mb-6 sm:mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('performers')}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer text-sm sm:text-base ${
              activeTab === 'performers'
                ? 'bg-[#1990FF] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <i className="ri-user-star-line mr-2"></i>
            Artists & Performers
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer text-sm sm:text-base ${
              activeTab === 'events'
                ? 'bg-[#1990FF] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <i className="ri-calendar-event-line mr-2"></i>
            Upcoming Events
          </button>
        </div>

        {/* Loading State */}
        {loading && !error && (
          <div className="text-center py-16 sm:py-20">
            <i className="ri-loader-4-line text-4xl sm:text-5xl text-[#1990FF] animate-spin mb-4"></i>
            <p className="text-sm sm:text-base text-gray-600">Loading concerts and events...</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">Check browser console (F12) for detailed logs</p>
          </div>
        )}

        {/* Performers Tab */}
        {!loading && !error && activeTab === 'performers' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredPerformers.map((performer) => (
              <div
                key={performer.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 relative overflow-hidden">
                  {performer.image ? (
                    <img
                      src={performer.image}
                      alt={performer.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <i className="ri-music-2-line text-5xl sm:text-6xl text-gray-300"></i>
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-bold text-gray-900 mb-2 truncate text-sm sm:text-base">{performer.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">
                    {performer.num_upcoming_events} upcoming events
                  </p>
                  <button
                    onClick={() => handleViewEvents(performer.slug)}
                    className="block w-full text-center bg-[#1990FF] text-white py-2 rounded-lg hover:bg-[#0070E0] transition-colors whitespace-nowrap cursor-pointer text-sm sm:text-base"
                  >
                    View Events
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Events Tab */}
        {!loading && !error && activeTab === 'events' && (
          <div className="space-y-3 sm:space-y-4">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className="w-full sm:w-20 md:w-24 h-20 md:h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex-shrink-0 overflow-hidden">
                    {event.performers[0]?.image ? (
                      <img
                        src={event.performers[0].image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <i className="ri-music-2-line text-2xl sm:text-3xl text-gray-300"></i>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 break-words">{event.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                      <div className="flex items-center gap-2">
                        <i className="ri-calendar-line text-[#1990FF] flex-shrink-0"></i>
                        <span className="break-words">
                          {new Date(event.datetime_local).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-time-line text-[#1990FF] flex-shrink-0"></i>
                        <span>
                          {new Date(event.datetime_local).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="ri-map-pin-line text-[#1990FF] flex-shrink-0"></i>
                        <span className="break-words">
                          {event.venue.name}, {event.venue.city}, {event.venue.state}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleGetTickets(event.url)}
                      className="inline-flex items-center justify-center gap-2 bg-[#1990FF] text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-[#0070E0] transition-colors whitespace-nowrap cursor-pointer text-sm sm:text-base w-full sm:w-auto"
                    >
                      <i className="ri-ticket-line"></i>
                      Get Tickets
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && ((activeTab === 'performers' && filteredPerformers.length === 0) || (activeTab === 'events' && filteredEvents.length === 0)) && (
          <div className="text-center py-16 sm:py-20">
            <i className="ri-search-line text-4xl sm:text-5xl text-gray-300 mb-4"></i>
            <p className="text-sm sm:text-base text-gray-600">No results found</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">Try a different search term</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
