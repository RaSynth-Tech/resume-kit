import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { AuthResponse } from '@/types';
import { DB_TABLES } from '@/config/database';
import { Database } from '@/types/supabase';

type UserRow = Database['public']['Tables']['users']['Row'];

export async function POST(request: NextRequest) {
  try {
    const { email, password, provider } = await request.json();
    const supabase = getSupabaseServerClient();

    if (provider === 'google') {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${request.nextUrl.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      return NextResponse.json({
        success: true,
        data: {
          url: data.url,
        },
      });
    }

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Fetch user profile from users table
    const { data: profile, error: profileError } = await supabase
      .from(DB_TABLES.USERS)
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      console.warn('User profile not found:', profileError);
    }

    const response: AuthResponse = {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email!,
        name: (profile as UserRow)?.name ?? undefined,
        avatar_url: (profile as UserRow)?.avatar_url ?? undefined,
        created_at: data.user.created_at,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 }
    );
  }
}
