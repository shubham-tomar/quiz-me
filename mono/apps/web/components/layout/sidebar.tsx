"use client";

import Link from "next/link";
import { Brain } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function Sidebar() {
  const { user, signOut } = useAuth();
  
  return (
    <aside className="w-64 border-r hidden md:block p-4 h-screen">
      <div className="flex items-center gap-2 font-bold text-xl mb-6">
        <Brain className="h-6 w-6 text-primary" />
        <span>Quiz Me</span>
      </div>
      
      <nav className="space-y-1 mb-6">
        <Link 
          href="/dashboard" 
          className="block px-4 py-2 rounded-md hover:bg-muted transition-colors"
        >
          Dashboard
        </Link>
        <Link 
          href="/quizzes" 
          className="block px-4 py-2 rounded-md hover:bg-muted transition-colors"
        >
          My Quizzes
        </Link>
        <Link 
          href="/quizzes/create" 
          className="block px-4 py-2 rounded-md hover:bg-muted transition-colors"
        >
          Create Quiz
        </Link>
      </nav>
      
      {user && (
        <div className="absolute bottom-8 left-4 right-4">
          <div className="p-4 border-t">
            <div className="text-sm mb-2">{user.email}</div>
            <button 
              onClick={() => signOut()}
              className="text-sm text-primary hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
