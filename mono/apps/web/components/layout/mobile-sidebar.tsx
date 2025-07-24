"use client";

import { useState } from "react";
import Link from "next/link";
import { Brain, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  
  return (
    <div className="md:hidden">
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2 font-bold text-xl">
                <Brain className="h-6 w-6 text-primary" />
                <span>Quiz Me</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="flex-1 p-4 space-y-2">
              <Link 
                href="/dashboard" 
                className="block px-4 py-2 rounded-md hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                href="/quizzes" 
                className="block px-4 py-2 rounded-md hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                My Quizzes
              </Link>
              <Link 
                href="/quizzes/create" 
                className="block px-4 py-2 rounded-md hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Create Quiz
              </Link>
            </nav>
            
            {user && (
              <div className="p-4 border-t">
                <div className="text-sm mb-2">{user.email}</div>
                <button 
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="text-sm text-primary hover:underline"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
