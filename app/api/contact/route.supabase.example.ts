// OPTIONAL: Version with Supabase storage
// To use this version:
// 1. Install: npm install @supabase/supabase-js
// 2. Add SUPABASE_URL and SUPABASE_ANON_KEY to .env.local
// 3. Create a table in Supabase:
//    CREATE TABLE contact_submissions (
//      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//      name TEXT NOT NULL,
//      email TEXT NOT NULL,
//      message TEXT NOT NULL,
//      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
//    );
// 4. Replace the content of route.ts with this code

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // Parse JSON body
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if Supabase is configured
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { ok: false, error: 'Database service is not configured' },
        { status: 500 }
      );
    }

    // Store in Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { ok: false, error: 'Failed to save message' },
        { status: 500 }
      );
    }

    // Log the submission
    console.log('Contact form submission saved to Supabase:', {
      id: data?.[0]?.id,
      name,
      email,
      timestamp: new Date().toISOString(),
    });

    // Return success response
    return NextResponse.json(
      { ok: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { ok: false, error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { ok: false, error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

