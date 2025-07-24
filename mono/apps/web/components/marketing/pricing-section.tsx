"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for casual users and students",
    features: [
      "Create up to 5 quizzes",
      "Up to 15 questions per quiz",
      "Basic analytics",
      "Share quizzes with links"
    ],
    cta: "Get Started",
    popular: false
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "per month",
    description: "Great for educators and content creators",
    features: [
      "Unlimited quizzes",
      "Unlimited questions",
      "Advanced analytics",
      "Quiz customization",
      "Export results to CSV",
      "Priority support"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Team",
    price: "$29.99",
    period: "per month",
    description: "Perfect for schools and organizations",
    features: [
      "Everything in Pro",
      "Up to 10 team members",
      "Team dashboard",
      "Collaborative quiz creation",
      "Custom branding",
      "API access"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

export function PricingSection() {
  return (
    <section className="py-16 bg-white" id="pricing">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.name} 
              className={`relative rounded-lg border ${
                plan.popular 
                  ? "border-primary shadow-lg" 
                  : "border-gray-200"
              } p-8 flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl rounded-tr">
                  Most Popular
                </div>
              )}
              
              <div>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="ml-1 text-sm text-gray-500">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
              </div>
              
              <div className="flex-grow">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-2">
                        <Check className="h-3 w-3" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-auto">
                <Link href="/signup">
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600">
            All plans come with a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
