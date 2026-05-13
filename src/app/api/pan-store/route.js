import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const data = await request.json();

    const response = await axios.post(
      process.env.ITR_PAN_STORAGE_API,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('PAN Storage Error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to store PAN details' }, 
      { status: error.response?.status || 500 }
    );
  }
}
