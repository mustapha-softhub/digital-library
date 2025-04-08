'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';
import { UserMetadata } from './supabase';

// Define the AuthContext type
interface AuthContextType {
  user: any | null;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, role: string, fullName: string) => Promise<any>;
  signOut: () => Promise<void>;
  signInWithSocial: (provider: 'google' | 'facebook' | 'twitter') => Promise<any>;
  loading: boolean;
}

// Create the context with undefined as default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export function AuthProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, role: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
          full_name: fullName,
        },
      },
    });

    if (error) throw error;
    return data;
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const signInWithSocial = async (provider: 'google' | 'facebook' | 'twitter') => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  // Create the context value object
  const contextValue: AuthContextType = {
    user,
    signIn,
    signUp,
    signOut,
    signInWithSocial,
    loading
  };

  // Return the provider component with the context value
  return React.createElement(
    AuthContext.Provider,
    { value: contextValue },
    props.children
  );
}

// Create a hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
