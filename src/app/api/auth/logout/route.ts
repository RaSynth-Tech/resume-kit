import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Supabase signout error:', error);
      return NextResponse.json(
        { success: false, error: `Failed to logout from Supabase: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Logout successful' });
  } catch (error: any) {
    console.error('Generic logout error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'An unexpected error occurred during logout' },
      { status: 500 }
    );
  }
} 