import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../services/supabase/client';
import { getSession } from '../services/supabase/auth';
import { Session } from '@supabase/supabase-js';

type AuthContextType = {
  session: Session | null;
  user: any | null;
  loading: boolean;
  error: string | null;
  refreshUser?: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  error: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthContextType>({
    session: null,
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadSession = async () => {
      try {
        const { session, error } = await getSession();
        
        if (error) {
          setState(prev => ({ ...prev, error: error.message, loading: false }));
          return;
        }
        
        setState({
          session,
          user: session?.user ?? null,
          loading: false,
          error: null,
        });
      } catch (error: any) {
        setState(prev => ({ 
          ...prev, 
          error: error?.message || 'Failed to load session', 
          loading: false 
        }));
      }
    };

    loadSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setState({
          session,
          user: session?.user ?? null,
          loading: false,
          error: null,
        });
      }
    );

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const refreshUser = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        setState(prev => ({ ...prev, error: error.message, loading: false }));
        return;
      }
      
      setState({
        session,
        user: session?.user ?? null,
        loading: false,
        error: null,
        refreshUser
      });
    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        error: error?.message || 'Failed to refresh session', 
        loading: false 
      }));
    }
  };

  const contextValue = {
    ...state,
    refreshUser
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
