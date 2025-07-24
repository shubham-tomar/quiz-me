"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";

export function TargetUsersSection() {
  return (
    <section id="for-who" className="container py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Who Is Quiz Me For?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Our platform is designed to serve a variety of users with different assessment needs.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold">Teachers & Schools</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <span>Create assessments in minutes instead of hours</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <span>Integrate with popular learning management systems</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <span>Track student progress with detailed analytics</span>
            </li>
          </ul>
          <Button className="w-full mt-4">Educator Plans</Button>
        </div>
        
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold">Students</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <span>Create study materials from lecture notes</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <span>Practice with AI-generated questions for better retention</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <span>Get instant explanations for challenging concepts</span>
            </li>
          </ul>
          <Button className="w-full mt-4">Student Plans</Button>
        </div>
        
        <div className="border rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold">HR Teams</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <span>Create assessments for hiring and employee training</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <span>Standardize evaluation processes across departments</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5" />
              <span>Track skills development with comprehensive reporting</span>
            </li>
          </ul>
          <Button className="w-full mt-4">Business Plans</Button>
        </div>
      </div>
    </section>
  );
}
