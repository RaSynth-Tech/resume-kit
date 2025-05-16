import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const supabase = getSupabaseServerClient();
  const cookieStore = cookies(); // to manually set cookies later

  const { email, password, provider } = await request.json();

  // ✅ Handle Google OAuth
  if (provider === 'google') {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${request.headers.get('origin')}/auth/callback`,
      },
    });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: data.url });
  }

  // ✅ Validate email/password
  if (!email || !password) {
    return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.session) {
    return NextResponse.json({ success: false, error: error?.message ?? 'Unknown error' }, { status: 401 });
  }

  // ✅ Fetch user profile
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .single();

  // ✅ Create response
  const response = NextResponse.json({
    success: true,
    user: {
      id: data.user.id,
      email: data.user.email!,
      name: profile?.name ?? undefined,
      avatar_url: profile?.avatar_url ?? undefined,
      created_at: data.user.created_at,
    },
  });

  // ✅ Manually set cookies
  response.cookies.set('sb-access-token', data.session.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  response.cookies.set('sb-refresh-token', data.session.refresh_token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  return response;
}
