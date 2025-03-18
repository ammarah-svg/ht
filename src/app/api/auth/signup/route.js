import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const userSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(['reader', 'writer'], "Invalid role selected")
});

export async function POST(req) {
  try {
    await connectDB();

    // Ensure request has a body
    if (!req.body) {
      return NextResponse.json(
        { success: false, error: "Request body is missing" },
        { status: 400 }
      );
    }

    let body;
    try {
      const text = await req.text(); // Get raw body text
      body = JSON.parse(text); // Parse manually
    } catch (error) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Invalid JSON format in request body",
          details: error.message 
        },
        { status: 400 }
      );
    }

    // Validate request body
    try {
      const validatedData = userSchema.parse(body);
      
      // Check if user already exists
      const existingUser = await User.findOne({ email: validatedData.email });
      if (existingUser) {
        return NextResponse.json(
          { success: false, error: 'User already exists' },
          { status: 400 }
        );
      }

      // Create new user
      const user = await User.create(validatedData);

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
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
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { 
            success: false, 
            error: "Validation failed", 
            details: error.errors 
          },
          { status: 400 }
        );
      }
      throw error; // Re-throw other errors
    }
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "An error occurred during signup",
        details: error.message 
      },
      { status: 500 }
    );
  }
}