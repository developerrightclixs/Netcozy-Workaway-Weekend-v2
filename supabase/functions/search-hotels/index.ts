import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { destination, checkIn, checkOut, guests } = await req.json();

    // API credentials
    const apiKey = '08773c4838cab495b02ec81320f33beb';
    const apiSecret = Deno.env.get('HOTELBEDS_SECRET');

    if (!apiSecret) {
      return new Response(
        JSON.stringify({
          error: 'Configuration pending',
          message: 'Hotel booking service is being configured. Please provide the API secret to complete setup.',
          status: 'configuration_pending'
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate dates
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      return new Response(
        JSON.stringify({
          error: 'Invalid check-in date',
          message: 'Check-in date must be today or later',
          status: 'validation_error'
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (checkOutDate <= checkInDate) {
      return new Response(
        JSON.stringify({
          error: 'Invalid check-out date',
          message: 'Check-out date must be after check-in date',
          status: 'validation_error'
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Map destination to Hotelbeds destination code
    const destinationMap: { [key: string]: string } = {
      'new york': 'NYC',
      'los angeles': 'LAX',
      'london': 'LON',
      'paris': 'PAR',
      'tokyo': 'TYO',
      'dubai': 'DXB',
      'barcelona': 'BCN',
      'rome': 'ROM',
      'amsterdam': 'AMS',
      'singapore': 'SIN',
      'miami': 'MIA',
      'las vegas': 'LAS',
      'madrid': 'MAD',
      'berlin': 'BER',
      'sydney': 'SYD',
      'bangkok': 'BKK',
      'hong kong': 'HKG',
      'istanbul': 'IST',
      'vienna': 'VIE',
      'prague': 'PRG'
    };

    const destinationCode = destinationMap[destination.toLowerCase()] || 'NYC';

    // Create signature for Hotelbeds API
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(apiKey + apiSecret + timestamp)
    );
    const signatureHex = Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // Hotelbeds API request
    const hotelbedsResponse = await fetch('https://api.test.hotelbeds.com/hotel-api/1.0/hotels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': apiKey,
        'X-Signature': signatureHex,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        stay: {
          checkIn: checkIn,
          checkOut: checkOut,
        },
        occupancies: [
          {
            rooms: 1,
            adults: guests || 2,
            children: 0,
          },
        ],
        destination: {
          code: destinationCode,
        },
      }),
    });

    if (!hotelbedsResponse.ok) {
      const errorText = await hotelbedsResponse.text();
      console.error('Hotelbeds API error:', errorText);
      
      if (hotelbedsResponse.status === 401) {
        return new Response(
          JSON.stringify({
            error: 'Authentication failed',
            message: 'Hotel booking service authentication failed. Please verify API credentials.',
            status: 'auth_error'
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      return new Response(
        JSON.stringify({
          error: 'Service temporarily unavailable',
          message: 'Hotel booking service is temporarily unavailable. Please try again later.',
          status: 'service_error'
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await hotelbedsResponse.json();

    if (!data.hotels || data.hotels.hotels.length === 0) {
      return new Response(
        JSON.stringify({
          error: 'No hotels found',
          message: `No hotels available in ${destination} for the selected dates. Try different dates or destinations.`,
          status: 'no_results',
          hotels: []
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Transform Hotelbeds response to our format
    const hotels = data.hotels.hotels.slice(0, 20).map((hotel: any) => ({
      id: hotel.code,
      name: hotel.name,
      location: hotel.destinationName || destination,
      rating: hotel.categoryName ? parseFloat(hotel.categoryName.replace(/[^0-9.]/g, '')) || 4.0 : 4.0,
      price: hotel.minRate || 150,
      image: hotel.images?.[0]?.path 
        ? `https://photos.hotelbeds.com/giata/${hotel.images[0].path}`
        : `https://readdy.ai/api/search-image?query=luxury hotel ${destination} exterior modern architecture&width=800&height=600&seq=${hotel.code}&orientation=landscape`,
      amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant'],
      description: hotel.description?.content || `Experience luxury and comfort at ${hotel.name} in ${destination}.`,
    }));

    return new Response(
      JSON.stringify({ hotels, status: 'success' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in search-hotels function:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: 'An unexpected error occurred. Please try again.',
        status: 'error'
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
