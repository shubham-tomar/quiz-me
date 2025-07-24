"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log('ProtectedRoute - Component mounted');
    setMounted(true);
  }, []);

  useEffect(() => {
    console.log('ProtectedRoute - Auth state changed:', { 
      loading, 
      mounted, 
      userExists: !!user 
    });
    
    if (!loading && mounted && !user) {
      console.log('ProtectedRoute - Unauthorized access, redirecting to login');
      router.push("/login");
    } else if (!loading && mounted && user) {
      console.log('ProtectedRoute - User authenticated:', user.email);
    }
  }, [user, loading, mounted, router]);

  if (loading || !mounted || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
