import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  username?: string;
  password?: string;
  googleId?: string;
  name?: string;
  picture?: string;
  emailVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  username: {
    type: String,
    trim: true,
    sparse: true
  },
  password: {
    type: String,
    sparse: true
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true
  },
  name: {
    type: String,
    trim: true
  },
  picture: {
    type: String
  },
  emailVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create indexes for faster queries
UserSchema.index({ email: 1 });
UserSchema.index({ googleId: 1 });

// Prevent mongoose from creating a new model if it already exists
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User; 