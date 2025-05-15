import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Valid userId is required' },
        { status: 400 }
      );
    }

    // Check if user exists in auth.users
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.getUserById(userId);
    
    if (authError) {
      // If user not found, return success with deleted: false
      if (authError.message.includes('User not found')) {
        return NextResponse.json({
          success: true,
          deleted: false,
          message: 'User not found in auth system'
        });
      }
      throw authError;
    }

    // Delete from public.users first (if exists)
    const { error: profileError } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', userId);

    if (profileError) {
      console.error('Error deleting user profile:', profileError);
      // Continue with auth deletion even if profile deletion fails
    }

    // Delete from auth.users
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteError) {
      throw deleteError;
    }

    return NextResponse.json({
      success: true,
      deleted: true,
      message: 'User successfully deleted'
    });

  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to delete user',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 