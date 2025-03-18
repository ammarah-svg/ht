import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required")
});

export async function POST(req) {
  try {
    await connectDB();
    
    // Parse request body
    const body = await req.json();

    // Validate request body
    try {
      const validatedData = loginSchema.parse(body);
      
      // Find user by email
      const user = await User.findOne({ email: validatedData.email });
      if (!user) {
        return NextResponse.json(
          { success: false, error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      // Check password
      const isPasswordValid = await user.comparePassword(validatedData.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { success: false, error: 'Invalid credentials' },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
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
      throw error;
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "An error occurred during login",
        details: error.message 
      },
      { status: 500 }
    );
  }
}