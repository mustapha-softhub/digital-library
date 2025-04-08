import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserRole = 'admin' | 'librarian' | 'reader';

export interface UserMetadata {
  role: UserRole;
  full_name?: string;
}

export interface Book {
  id: string;
  title: string;
  author?: string;
  publication_date?: string;
  publisher?: string;
  summary?: string;
  categories?: string[];
  tags?: string[];
  availability: 'EBook' | 'Physical' | 'Audio' | 'EBook,Physical' | 'EBook,Audio' | 'Physical,Audio' | 'EBook,Physical,Audio';
  cover_image?: string;
  added_by: string;
  created_at: string;
}

export interface ChatHistory {
  id: string;
  user_id: string;
  book_id: string;
  messages: {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }[];
  created_at: string;
}
