"use client";

import Link from "next/link";
import { Brain } from "lucide-react";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl">
          <Brain className="h-6 w-6 text-primary" />
          <span>Quiz Me</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-primary">Features</Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">How It Works</Link>
          <Link href="#for-who" className="text-sm font-medium hover:text-primary">For Who</Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary">Pricing</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="outline" className="hidden md:inline-flex">Log In</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
