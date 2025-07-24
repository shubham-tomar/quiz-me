"use client";

import Link from "next/link";
import { Brain } from "lucide-react";
import { SignupForm } from "@/components/forms/signup-form";

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-center mb-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Brain className="h-6 w-6 text-primary" />
          <span>Quiz Me</span>
        </Link>
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground">Enter your information to get started</p>
      </div>
      
      <SignupForm />

    </div>
  );
}
