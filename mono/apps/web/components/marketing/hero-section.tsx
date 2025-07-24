"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-primary/10 to-white py-20 overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Create engaging quizzes in minutes
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Turn any content into interactive quizzes with our AI-powered platform. Perfect for educators, trainers, and content creators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/signup">
                <Button size="lg">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" size="lg">
                  See How It Works
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required • Free 14-day trial • Cancel anytime
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-white shadow-xl rounded-lg p-3 border">
              <div className="aspect-video rounded-md overflow-hidden bg-gray-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="max-w-[80%] space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded border">
                        <div className="w-4 h-4 rounded-full border border-primary"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded border">
                        <div className="w-4 h-4 rounded-full border border-primary"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-primary/10 rounded border border-primary">
                        <div className="w-4 h-4 rounded-full bg-primary"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </div>
                      <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded border">
                        <div className="w-4 h-4 rounded-full border border-primary"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="w-20 h-8 bg-primary rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="absolute -top-6 -left-6 w-36 h-36 bg-primary/10 rounded-full blur-2xl"></div>
          </div>
        </div>
        
        <div className="mt-20 text-center">
          <p className="text-sm uppercase text-gray-500 font-medium mb-4">Trusted by educators worldwide</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-70">
            <div className="h-8 w-32 bg-gray-300 rounded"></div>
            <div className="h-8 w-32 bg-gray-300 rounded"></div>
            <div className="h-8 w-32 bg-gray-300 rounded"></div>
            <div className="h-8 w-32 bg-gray-300 rounded"></div>
            <div className="h-8 w-32 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
