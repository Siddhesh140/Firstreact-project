import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Memory {
  id: string;
  user_id: string;
  title: string;
  category: string;
  type: 'photo' | 'video';
  url: string;
  caption: string;
  story: string;
  date: string;
  created_at: string;
  updated_at: string;
}

export interface Dream {
  id: string;
  user_id: string;
  title: string;
  category: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'idea' | 'planning' | 'booked';
  image: string;
  notes: string;
  created_at: string;
  updated_at: string;
}