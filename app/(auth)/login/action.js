'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signinWithGoogle() {
  const supabase = await createClient();
  const redirectTo =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/Home'
      : `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      scopes: 'https://www.googleapis.com/auth/calendar',
      redirectTo,
    },
  });

  if (data.url) {
    redirect(data.url);
  }
  if (error) {
    console.error('Error logging in with Google:', error);
    return { error: 'Error logging in with Google, please try again later' };
  }
}

export async function login(formData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { success: false, message: 'Incorrect email or password. Please try again.' };
  }

  revalidatePath('/Home', 'layout');
  redirect('/Home');
}
