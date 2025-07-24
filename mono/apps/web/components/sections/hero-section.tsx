"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export function HeroSection() {
  return (
    <section className="container py-20 md:py-32 flex flex-col md:flex-row items-center gap-10">
      <div className="flex-1 space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Generate quizzes from text, PDFs, videos & more — instantly with AI
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Upload text, PDFs, images, audio, videos or paste a website URL — all processed in 1-click with our powerful AI.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg">
            Try Quiz Me for Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg">
            View Demo
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <div className="relative w-full aspect-square md:aspect-video max-w-md md:max-w-lg">
          {/* Replace with actual screenshot or hero image */}
          <div className="bg-muted rounded-lg w-full h-full flex items-center justify-center">
            <p className="text-muted-foreground">Hero Image Placeholder</p>
          </div>
        </div>
      </div>
    </section>
  );
}
