import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function GET() {
  try {
  
    const isConnected = mongoose.connection.readyState === 1;
    
   
    const hasGoogleClientId = !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const hasMongoUri = !!process.env.MONGODB_URI;

    return NextResponse.json({
      status: 'ok',
      checks: {
        mongodb: isConnected ? 'connected' : 'disconnected',
        googleClientId: hasGoogleClientId ? 'configured' : 'missing',
        mongoUri: hasMongoUri ? 'configured' : 'missing'
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 