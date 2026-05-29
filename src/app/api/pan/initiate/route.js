
// import { NextResponse } from 'next/server';

// export async function POST(request) {
//   try {
//     const { pan_number, dob } = await request.json();

//     const apiKey = process.env.SANDBOX_KEY || '';
//     const apiSecret = process.env.SANDBOX_SECRET || '';

//     // STEP 1: Sandbox Test Mode ke liye background mein Access Token lena padta hai
//     console.log("Generating Sandbox Access Token...");
//     const authResponse = await fetch('https://api.sandbox.co.in/authenticate', {
//       method: 'POST',
//       headers: {
//         'accept': 'application/json',
//         'x-api-key': apiKey,
//         'x-api-secret': apiSecret,
//         'Content-Type': 'application/json'
//       }
//     });

//     const authResult = await authResponse.json();

//     // Agar token generate nahi hua toh error handle karein
//     if (!authResponse.ok) {
//       console.error("Auth Token Generation Failed:", authResult);
//       return NextResponse.json(
//         { error: authResult.message || 'Failed to authenticate with Sandbox' },
//         { status: authResponse.status }
//       );
//     }

//     const accessToken = authResult.access_token;
//     console.log("Access Token Generated Successfully!");

//     // STEP 2: Ab isi Access Token ko Authorization header mein bhej kar PAN verification hit karein
//     const response = await fetch('https://api.sandbox.co.in/kyc/pan/otp/initiate', {
//       method: 'POST',
//       headers: {
//         'accept': 'application/json',
//         'x-api-key': apiKey,
//         'Authorization': accessToken, // Yahan generated token jaayega, key_test_... nahi!
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         doc_number: pan_number,
//         dob: dob
//       })
//     });

//     const result = await response.json();
//     console.log("Sandbox PAN Route Response:", result);

//     if (!response.ok) {
//       return NextResponse.json(
//         { error: result.message || 'Sandbox verification failed' },
//         { status: response.status }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       reference_id: result.data?.reference_id,
//       message: result.message || 'OTP triggered successfully.',
//     });

//   } catch (error) {
//     console.error("Server Crash Protected:", error);
//     return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
//   }
// } 




import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Frontend se data nikal rahe hain
    const { pan_number, dob } = await request.json();
    console.log("Frontend se aaya data:", { pan_number, dob });

    const apiKey = process.env.SANDBOX_KEY || 'key_test_d44f674beb5443048009963b32cf3e50';
    const apiSecret = process.env.SANDBOX_SECRET || 'secret_test_2dc9764d431e4061885f16e4c51468e2';

    // STEP 1: Sandbox Token Generate Karna
    console.log("Generating Sandbox Access Token...");
    const authResponse = await fetch('https://api.sandbox.co.in/authenticate', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'x-api-key': apiKey,
        'x-api-secret': apiSecret,
        'Content-Type': 'application/json'
      }
    });

    const authResult = await authResponse.json();

    if (!authResponse.ok) {
      console.error("Auth Token Generation Failed:", authResult);
      return NextResponse.json(
        { error: authResult.message || 'Failed to authenticate with Sandbox' },
        { status: authResponse.status }
      );
    }

    const accessToken = authResult.access_token;
    console.log("Access Token Generated Successfully!");

    // STEP 2: PAN Request Bhejna (Strict Body Format)
    console.log("Sending PAN Request to Sandbox...");
    
    const requestBody = {
      doc_number: pan_number,
      dob: dob
    };

    console.log("Sending Request Body:", JSON.stringify(requestBody));

    const response = await fetch('https://api.sandbox.co.in/kyc/pan/otp/initiate', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'x-api-key': apiKey,
        'Authorization': accessToken, 
        'Content-Type': 'application/json' // Yeh header hona bohot zaroori hai body ke liye
      },
      body: JSON.stringify(requestBody) // Strict stringify pass ho raha hai
    });

    const result = await response.json();
    console.log("Sandbox PAN API Final Response:", result);

    if (!response.ok) {
      return NextResponse.json( 
        { error: result.message || 'Sandbox validation failed' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      reference_id: result.data?.reference_id || result.reference_id,
      message: result.message || 'OTP triggered successfully.',
    });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
} 
