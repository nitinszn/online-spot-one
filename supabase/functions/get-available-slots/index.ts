import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { date } = await req.json();
    
    if (!date) {
      return new Response(
        JSON.stringify({ error: 'Date is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching available slots for date:', date);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch existing bookings for the date
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select('booking_time')
      .eq('booking_date', date)
      .eq('status', 'confirmed');

    if (bookingsError) {
      console.error('Error fetching bookings:', bookingsError);
      throw bookingsError;
    }

    console.log('Existing bookings:', bookings);

    // Generate time slots from 9 AM to 5 PM (every 30 minutes)
    const allSlots = [];
    for (let hour = 9; hour < 17; hour++) {
      for (let minute of [0, 30]) {
        if (hour === 16 && minute === 30) break; // Stop at 4:30 PM to allow for last session
        allSlots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00`);
      }
    }

    // Filter out booked slots
    const bookedTimes = new Set(bookings?.map(b => b.booking_time) || []);
    const availableSlots = allSlots.filter(slot => !bookedTimes.has(slot));

    console.log('Available slots:', availableSlots);

    return new Response(
      JSON.stringify({ availableSlots }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error in get-available-slots:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch available slots';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});