import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI || '');
}

// Define User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String },
  googleId: { type: String },
  createdAt: { type: Date, default: Date.now },
});



const User = mongoose.models.User || mongoose.model('User', userSchema);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

  
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

   
    if (!user.password) {
      return NextResponse.json(
        { message: 'Please sign in with Google' },
        { status: 401 }
      );
    }

    
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    use effect()=>{
      try{
        const response = await fetch("http://example.com")
        const result = response.json()

      }catch(error){
        retur
      }
    }
    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 