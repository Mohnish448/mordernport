import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: 'Email and message are required fields.' },
        { status: 400 }
      );
    }

    const recipientEmail = 'mohnishkumar724@gmail.com';

    // Submit transmission to FormSubmit to route directly to mohnishkumar724@gmail.com
    const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: name || 'Anonymous Explorer',
        email: email,
        message: message,
        _subject: `[Portfolio Transmission] Incoming dispatch from ${name || email}`,
        _template: 'table',
        _captcha: 'false',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to dispatch email.' },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Transmission successfully delivered to mohnishkumar724@gmail.com',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred during transmission.' },
      { status: 500 }
    );
  }
}
