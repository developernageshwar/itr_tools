import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { reference_id, otp } = await request.json();

    const response = await fetch('https://api.sandbox.co.in/kyc/pan/otp/verify', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'x-api-key': process.env.SANDBOX_KEY || '',
        'Authorization': process.env.SANDBOX_SECRET || '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reference_id: reference_id,
        otp: otp
      })
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: result.message || 'OTP verification failed' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      full_name: result.data?.full_name,
      status: result.data?.status,
    });

  } catch (error) {
    console.error("Verify Internal Error:", error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}