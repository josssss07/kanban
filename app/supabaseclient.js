import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,  // ✅ Ensure sessions persist
    autoRefreshToken: true, // ✅ Ensure tokens are refreshed automatically
    detectSessionInUrl: true, // ✅ Helps with OAuth logins
  },
});
export default supabase;
