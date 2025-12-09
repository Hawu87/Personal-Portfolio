import { NextRequest, NextResponse } from 'next/server';

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

    // Log the submission (for now)
    console.log('Contact form submission:', {
      name,
      email,
      message,
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

