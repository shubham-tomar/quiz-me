"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  email?: string;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  // Initialize Supabase client with environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  console.log('AuthProvider init - SUPABASE URL:', supabaseUrl ? 'Exists' : 'Missing');
  console.log('AuthProvider init - SUPABASE KEY:', supabaseAnonKey ? 'Exists' : 'Missing');
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    // Return a limited context with authentication disabled
    return (
      <AuthContext.Provider
        value={{
          user: null,
          loading: false,
          signIn: async () => ({ error: new Error('Auth not configured') }),
          signUp: async () => ({ error: new Error('Auth not configured') }),
          signOut: async () => {}
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  useEffect(() => {
    // Check active sessions and sets the user
    const getSession = async () => {
      console.log('AuthProvider - getSession() called');
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      console.log('AuthProvider - Session data:', session ? 'Exists' : 'None');
      
      if (session?.user) {
        console.log('AuthProvider - User authenticated:', session.user.email);
        setUser(session.user);
      } else {
        console.log('AuthProvider - No user found in session');
        setUser(null);
      }
      
      setLoading(false);
    };

    // Call getSession initially
    getSession();

    // Listen for authentication state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('AuthProvider - signIn() called with email:', email);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      console.log('AuthProvider - signIn result:', error ? `Error: ${error.message}` : 'Success');
      if (!error) {
        router.push('/dashboard');
      }
      return { error };
    } catch (error: any) {
      console.error('AuthProvider - signIn exception:', error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string) => {
    console.log('AuthProvider - signUp() called with email:', email);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      console.log('AuthProvider - signUp result:', error ? `Error: ${error.message}` : 'Success');
      if (!error) {
        router.push('/login');
      }
      return { error };
    } catch (error: any) {
      console.error('AuthProvider - signUp exception:', error);
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
