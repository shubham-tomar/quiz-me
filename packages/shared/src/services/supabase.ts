import { createClient } from '@supabase/supabase-js';

const getSupabaseConfig = () => {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL || 
             process.env.NEXT_PUBLIC_SUPABASE_URL || 
             process.env.SUPABASE_URL;
             
  const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 
                  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
                  process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.warn('Supabase credentials not configured. Using placeholder values.');
    return {
      url: 'https://placeholder.supabase.co',
      anonKey: 'placeholder-anon-key'
    };
  }

  return { url, anonKey };
};

const { url, anonKey } = getSupabaseConfig();
export const supabase = createClient(url, anonKey);