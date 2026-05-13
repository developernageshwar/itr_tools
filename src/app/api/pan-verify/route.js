import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const { pan, dob, fullName } = await request.json();

    if (!pan || !dob) {
      return NextResponse.json({ error: 'PAN and Date of Birth are required' }, { status: 400 });
    }

    const payload = {
      "@entity": "in.co.sandbox.kyc.pan_verification.request",
      "pan": pan.toUpperCase(),
      "name_as_per_pan": fullName,
      "date_of_birth": dob,
      "consent": "Y",
      "reason": "For onboarding customers"
    };

    // Ensure token has Bearer prefix if missing
    const authToken = process.env.SANDBOX_AUTH_TOKEN?.startsWith('Bearer ')
      ? process.env.SANDBOX_AUTH_TOKEN
      : `Bearer ${process.env.SANDBOX_AUTH_TOKEN}`;

    const response = await axios.post(
      'https://api.sandbox.co.in/kyc/pan/verify',
      payload,
      {
        headers: {
          'x-api-key': process.env.SANDBOX_API_KEY,
          'x-api-secret': process.env.SANDBOX_SECRET,
          'Authorization': authToken,
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'x-api-version': '1.0'
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('PAN Verification Error:', error.response?.data || error.message);

    const responseData = error.response?.data;
    const errorMessage = responseData?.message || responseData?.error?.message || responseData?.error || 'Failed to verify PAN details';

    return NextResponse.json(
      {
        error: errorMessage,
        details: responseData
      },
      { status: error.response?.status || 500 }
    );
  }
}
