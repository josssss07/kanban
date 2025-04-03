'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)


  if (error) {
    redirect('/error')
  }
  

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const email = formData.get('email');
  const password = formData.get('password');
  const userName = formData.get('userName'); // Capture the username
  console.log(userName);
  console.log(email);
  console.log(password);

  // Step 1: Sign up the user in Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { 
      data: { userName } // This ensures metadata is passed
    }
  });
  
  console.log("Signup Response:", data, error);
  

  if (error) {
     redirect('/error')
  }
    
  const userId = data.user?.id; // Get the new user's ID

  if (!userId) {
    console.log('User ID not found after signup');
    // redirect('/error');
  }

  // Step 2: Insert user into the 'users' table
  const { error: insertError } = await supabase.from('users').insert([
    {
      userId,
      userName,
      email,
    },
  ]);

  if (insertError) {
    console.log('Error inserting into users table:', insertError);
    // redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/mainhome');


}