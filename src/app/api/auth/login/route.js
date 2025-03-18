import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
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
    const validatedData = loginSchema.parse(body);

    // Find user by email
    const user = await User.findOne({ email: validatedData.email });
    if (!user) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(validatedData.password);
    if (!isPasswordValid) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    }

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
    console.error("Login error:", error);

    return NextResponse.json(
      { success: false, error: "An error occurred during login. Please try again.", details: error.message },
      { status: 500 }
    );
  }
}
