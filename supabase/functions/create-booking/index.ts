import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface BookingRequest {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  sessionType: string;
  bookingDate: string;
  bookingTime: string;
  notes?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingRequest = await req.json();
    
    console.log('Creating booking:', bookingData);

    // Validate required fields
    if (!bookingData.clientName || !bookingData.clientEmail || 
        !bookingData.sessionType || !bookingData.bookingDate || !bookingData.bookingTime) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if slot is still available
    const { data: existingBooking } = await supabase
      .from('bookings')
      .select('id')
      .eq('booking_date', bookingData.bookingDate)
      .eq('booking_time', bookingData.bookingTime)
      .eq('status', 'confirmed')
      .maybeSingle();

    if (existingBooking) {
      return new Response(
        JSON.stringify({ error: 'This time slot is no longer available' }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Google Calendar event
    let googleEventId = null;
    try {
      googleEventId = await createGoogleCalendarEvent(bookingData);
      console.log('Google Calendar event created:', googleEventId);
    } catch (error) {
      console.error('Error creating Google Calendar event:', error);
      // Continue with booking even if Google Calendar fails
    }

    // Insert booking into database
    const { data: booking, error: insertError } = await supabase
      .from('bookings')
      .insert({
        client_name: bookingData.clientName,
        client_email: bookingData.clientEmail,
        client_phone: bookingData.clientPhone,
        session_type: bookingData.sessionType,
        booking_date: bookingData.bookingDate,
        booking_time: bookingData.bookingTime,
        notes: bookingData.notes,
        google_event_id: googleEventId,
        status: 'confirmed'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting booking:', insertError);
      throw insertError;
    }

    console.log('Booking created successfully:', booking);

    return new Response(
      JSON.stringify({ 
        success: true, 
        booking,
        message: 'Your consultation has been scheduled successfully! You will receive a confirmation email shortly.'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error in create-booking:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create booking';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function createGoogleCalendarEvent(bookingData: BookingRequest): Promise<string | null> {
  const clientId = Deno.env.get('GOOGLE_CLIENT_ID');
  const clientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET');

  if (!clientId || !clientSecret) {
    console.error('Google Calendar credentials not configured');
    return null;
  }

  // Get OAuth2 access token
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: Deno.env.get('GOOGLE_REFRESH_TOKEN') || '',
      grant_type: 'refresh_token',
    }),
  });

  if (!tokenResponse.ok) {
    const error = await tokenResponse.text();
    console.error('Failed to get access token:', error);
    throw new Error('Failed to authenticate with Google Calendar');
  }

  const { access_token } = await tokenResponse.json();

  // Calculate session duration based on session type
  const durationMap: { [key: string]: number } = {
    'Initial Consultation': 90,
    'Follow-Up Session': 45,
    'Quick Check-In': 30
  };
  const duration = durationMap[bookingData.sessionType] || 60;

  // Create event
  const startDateTime = `${bookingData.bookingDate}T${bookingData.bookingTime}`;
  const startDate = new Date(startDateTime);
  const endDate = new Date(startDate.getTime() + duration * 60000);

  const event = {
    summary: `${bookingData.sessionType} - ${bookingData.clientName}`,
    description: `Session Type: ${bookingData.sessionType}\nClient: ${bookingData.clientName}\nEmail: ${bookingData.clientEmail}\nPhone: ${bookingData.clientPhone || 'N/A'}\nNotes: ${bookingData.notes || 'None'}`,
    start: {
      dateTime: startDate.toISOString(),
      timeZone: 'Asia/Kolkata',
    },
    end: {
      dateTime: endDate.toISOString(),
      timeZone: 'Asia/Kolkata',
    },
    attendees: [
      { email: bookingData.clientEmail }
    ],
    conferenceData: {
      createRequest: {
        requestId: crypto.randomUUID(),
        conferenceSolutionKey: {
          type: 'hangoutsMeet'
        }
      }
    }
  };

  const eventResponse = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });

  if (!eventResponse.ok) {
    const error = await eventResponse.text();
    console.error('Failed to create calendar event:', error);
    throw new Error('Failed to create calendar event');
  }

  const createdEvent = await eventResponse.json();
  return createdEvent.id;
}