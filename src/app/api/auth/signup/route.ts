import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { AuthResponse } from '@/types';
import { DB_TABLES } from '@/config/database';
import { Database } from '@/types/supabase';


export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }
    console.log("Signing up with email:", email, "and password:", password);
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      }
    });
    console.log("Signup data:", data);
    if (error) throw error;

    if (!data.user) {
      throw new Error('User creation succeeded but no user data returned');
    }

    // Create user profile
    const { error: profileError } = await supabase
      .from(DB_TABLES.USERS)
      .insert([
        {
          id: data.user.id,
          email: data.user.email!,
          name,
        },
      ]);

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // Return a success response even if profile creation fails
      // The user can update their profile later
      return NextResponse.json({
        success: true,
        user: {
          id: data.user.id,
          email: data.user.email!,
          name,
          created_at: data.user.created_at,
        },
        warning: 'User created but profile setup incomplete. Please try updating your profile later.'
      });
    }

    const response: AuthResponse = {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email!,
        name,
        created_at: data.user.created_at,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create account' },
      { status: 400 }
    );
  }
} 