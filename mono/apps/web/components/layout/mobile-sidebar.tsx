"use client";

import { useState } from "react";
import Link from "next/link";
import { Brain, Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "@/components/ui/theme-toggle";

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
            
            <div className="p-4 border-t flex items-center justify-between">
              <ThemeToggle variant="full" />
            </div>
            
            {user && (
              <div className="p-4 border-t space-y-2">
                <Link 
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/80"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{user.email}</div>
                    <div className="text-xs text-muted-foreground">View Profile</div>
                  </div>
                </Link>
                
                <button 
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/80 w-full text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
                    <LogOut size={16} className="text-muted-foreground" />
                  </div>
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
