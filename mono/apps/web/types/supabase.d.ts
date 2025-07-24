declare module '@supabase/supabase-js' {
  export interface User {
    id: string;
    email?: string;
  }

  export interface Session {
    user: User;
  }

  export interface AuthResponse {
    data: {
      user: User | null;
      session: Session | null;
    };
    error: Error | null;
  }

  export interface AuthClient {
    getSession(): Promise<{ data: { session: Session | null } }>;
    getUser(): Promise<{ data: { user: User | null } }>;
    signInWithPassword(credentials: { email: string; password: string }): Promise<AuthResponse>;
    signUp(credentials: { email: string; password: string }): Promise<AuthResponse>;
    signOut(): Promise<{ error: Error | null }>;
    onAuthStateChange(callback: (event: string, session: Session | null) => void): { 
      data: { 
        subscription: { 
          unsubscribe: () => void 
        } 
      } 
    };
  }

  export interface SupabaseClient {
    auth: AuthClient;
  }

  export function createClient(url: string, key: string): SupabaseClient;
}
