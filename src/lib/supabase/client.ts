
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Use placeholder values that will be replaced by the user.
// It's recommended to use environment variables for these in a real application.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://<SUPABASE_URL>.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '<ANON_KEY>';

// Declare a global variable for the Supabase client to enable caching.
declare global {
  var supabase: SupabaseClient | undefined;
}

let supabase: SupabaseClient;

if (process.env.NODE_ENV === 'production') {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // In development, use a global variable to preserve the client across HMR reloads.
  if (!global.supabase) {
    global.supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  supabase = global.supabase;
}


export default supabase;
