import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import { DB_TABLES } from '@/config/database';
import { Database } from '@/types/supabase';

type UserRow = Database['public']['Tables']['users']['Row'];

export async function DELETE(request: NextRequest) {
  try {
    const supabase = getSupabaseServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Delete user profile from users table
    const { error: profileError } = await supabase
      .from(DB_TABLES.USERS)
      .delete()
      .eq('id', user.id);

    if (profileError) {
      console.error('Error deleting user profile:', profileError);
      return NextResponse.json(
        { success: false, error: 'Failed to delete user profile' },
        { status: 500 }
      );
    }

    // Delete auth user
    const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);

    if (deleteError) {
      console.error('Error deleting auth user:', deleteError);
      return NextResponse.json(
        { success: false, error: 'Failed to delete user account' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete account error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete account' },
      { status: 500 }
    );
  }
} 