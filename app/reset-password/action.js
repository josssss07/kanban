'use server'

import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function requestPasswordReset(formData) {
  const cookieStore = cookies();
  
  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  try {
    const email = formData.get('email');
    
    if (!email) {
      return { success: false, error: 'Email is required' };
    }
    
    // Set redirect URL for the reset email - point to update-password page
    const redirectTo = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/update-password`;
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectTo
    });
    
    if (error) {
      console.error('Password reset request error:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Reset password error:', error);
    return { success: false, error: 'An error occurred during password reset' };
  }
}