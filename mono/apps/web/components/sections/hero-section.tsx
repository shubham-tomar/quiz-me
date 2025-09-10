"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Brain } from "lucide-react";
import { Button } from "../ui/button";

export function HeroSection() {
  return (
    <section className="w-full marketing-hero-bg py-20 md:py-32">
      <div className="container flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Generate quizzes from text, PDFs, videos & more — instantly with AI
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Upload text, PDFs, images, audio, videos or paste a website URL — all processed in 1-click with our powerful AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup">
              <Button size="lg" variant="gradient" className="group">
                Start for free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Login
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 relative hidden md:block">
          <div className="aspect-video w-full relative marketing-hero-gradient rounded-lg overflow-hidden shadow-xl">
            {/* Placeholder for hero image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="h-32 w-32 text-primary/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
