import connectDB from '@/app/utils/config/db'
import { NextResponse } from "next/server";

const connectDatabase = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
};

connectDatabase();

export async function GET(request: Request) {
  return new Response("Hello, this is the student API route!");
}

