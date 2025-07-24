"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
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

// Create a singleton instance of Supabase client to prevent multiple instances
let supabaseInstance: SupabaseClient | null = null;

const getSupabase = (): SupabaseClient => {
  if (supabaseInstance) return supabaseInstance;
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    throw new Error('Missing Supabase environment variables');
  }
  
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  
  return supabaseInstance;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  
  // Get the singleton Supabase client
  const supabase = getSupabase();

  useEffect(() => {
    // Check active sessions and sets the user
    const getSession = async () => {
      console.log('AuthProvider - getSession() called');
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      console.log('AuthProvider - Session data:', session ? 'Exists' : 'None');
      
      if (session?.user) {
        console.log('AuthProvider - User authenticated:', session.user.email);
        setUser(session.user as User);
      } else {
        console.log('AuthProvider - No user found in session');
        setUser(null);
      }
      
      setLoading(false);
    };

    // Call getSession initially
    getSession();

    // Listen for authentication state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user as User);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth, router]);

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
    console.log('AuthProvider - signOut() called');
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
