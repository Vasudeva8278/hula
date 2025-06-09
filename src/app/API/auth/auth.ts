import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import mongoose from 'mongoose';


if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI || '');
}


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String },
  googleId: { type: String },
  createdAt: { type: Date, default: Date.now },
});


const User = mongoose.models.User || mongoose.model('User', userSchema);

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function verifyGoogleToken(token: string) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { credential, email, username, password } = req.body;

  try {
    if (credential) {
      
      const payload = await verifyGoogleToken(credential);
      
      if (!payload?.email) {
        return res.status(400).json({ message: 'Invalid Google token' });
      }

      
      let user = await User.findOne({ email: payload.email });

      if (!user) {
        
        user = await User.create({
          email: payload.email,
          username: payload.name || payload.email.split('@')[0],
          googleId: payload.sub,
        });
      }

      return res.status(200).json({ 
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
        }
      });
    } else if (email && username && password) {
      
      const existingUser = await User.findOne({ 
        $or: [{ email }, { username }] 
      });

      if (existingUser) {
        return res.status(400).json({ 
          message: 'User with this email or username already exists' 
        });
      }

      const user = await User.create({
        email,
        username,
        password, // Note: In production, you should hash the password
      });

      return res.status(201).json({ 
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
        }
      });
    } else {
      return res.status(400).json({ message: 'Missing required fields' });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}