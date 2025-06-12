import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import mongoose from 'mongoose';
import User from '@/app/models/User';


const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(request: Request) {
  try {
    await connectDB();

    const { credential } = await request.json();

    if (!credential) {
      return NextResponse.json(
        { message: 'Missing credential' },
        { status: 400 }
      );
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 400 }
      );
    }

    const { email, sub: googleId, name, picture, email_verified } = payload;

    if (!email) {
      return NextResponse.json(
        { message: 'Email not provided by Google' },
        { status: 400 }
      );
    }


    
    let user = await User.findOne({ email });

    if (!user) {
      
      user = await User.create({
        email,
        googleId,
        name,
        picture,
        emailVerified: email_verified
      });
    } else if (!user.googleId) {
      user.googleId = googleId;
      user.name = name;
      user.picture = picture;
      user.emailVerified = email_verified;
      await user.save();
    }

   
    const userData = {
      id: user._id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      emailVerified: user.emailVerified
    };

    return NextResponse.json({ user: userData });
  } catch (error) {
    console.error('Google auth error:', error);
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 500 }
    );
  }
} 



