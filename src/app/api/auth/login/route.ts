import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { AuthResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({
      cookies: () => cookieStore
    });

    const { email, password, provider } = await request.json();

    if (provider === 'google') {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${request.headers.get('origin')}/auth/callback`,
        },
      });

      if (error) throw error;

      return NextResponse.json({
        success: true,
        data: data.url,
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

    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    const response: AuthResponse = {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email!,
        name: profile?.name ?? undefined,
        avatar_url: profile?.avatar_url ?? undefined,
        created_at: data.user.created_at,
      },
    };

    // Create a new response with the JSON data
    const jsonResponse = NextResponse.json(response);

    // Use the session from the sign-in response
    if (data.session) {
      // Set the session cookie in the response
      jsonResponse.cookies.set('sb-access-token', data.session.access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      jsonResponse.cookies.set('sb-refresh-token', data.session.refresh_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      // Also set the session cookie that Supabase expects
      jsonResponse.cookies.set('sb-auth-token', JSON.stringify({
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 1 week
      }), {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
    }

    return jsonResponse;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid login credentials' },
      { status: 401 }
    );
  }
} 