// OPTIONAL: Version with Resend email sending
// To use this version:
// 1. Install: npm install resend
// 2. Add RESEND_API_KEY to .env.local
// 3. Replace the content of route.ts with this code

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Update with your verified domain
      to: ['hawundlovu57@gmail.com'], // Your email address
      replyTo: email,
      subject: `Portfolio Contact Form: Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { ok: false, error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Log the submission
    console.log('Contact form submission sent via email:', {
      name,
      email,
      messageId: data?.id,
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

