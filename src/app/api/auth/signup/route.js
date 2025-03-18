import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const userSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['reader', 'writer'])
});

export async function POST(req) {
  try {
    await connectDB();

    let body;
    try {
      body = await req.json();
    } catch (error) {
      return NextResponse.json({ success: false, error: "Invalid JSON format" }, { status: 400 });
    }

    // Validate request body
    const validatedData = userSchema.parse(body);

    // Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return NextResponse.json({ success: false, error: 'User already exists' }, { status: 400 });
    }

    // Create new user
    const user = await User.create(validatedData);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Signup error:", error);

    return NextResponse.json(
      { success: false, error: "An error occurred during signup. Please try again.", details: error.message },
      { status: 500 }
    );
  }
}
