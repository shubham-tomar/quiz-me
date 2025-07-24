"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export function CtaSection() {
  return (
    <section className="container py-20 text-center">
      <div className="max-w-3xl mx-auto space-y-8">
        <h2 className="text-4xl font-bold">Ready to transform the way you create quizzes?</h2>
        <p className="text-xl text-muted-foreground">
          Join thousands of educators and professionals who are saving time and creating better assessments with Quiz Me.
        </p>
        <Button size="lg">
          Get Started for Free
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <p className="text-muted-foreground text-sm">No credit card required</p>
      </div>
    </section>
  );
}
