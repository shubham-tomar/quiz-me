"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Brain, Book, Download, Video, FileText, Link as LinkIcon, Search, UploadCloud } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Web() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
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
            <Button variant="outline" className="hidden md:inline-flex">Log In</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="container py-20 md:py-32 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Generate quizzes from text, PDFs, videos & more — instantly with AI
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Upload text, PDFs, images, audio, videos or paste a website URL — all processed in 1-click with our powerful AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="gradient" className="group">
              Start for free
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              See how it works
            </Button>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>150,000+ users trust us</span>
            </div>
          </div>
        </div>
        <div className="flex-1 relative hidden md:block">
          <div className="aspect-video w-full relative bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-lg overflow-hidden shadow-xl">
            {/* Placeholder for hero image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="h-32 w-32 text-primary/30" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="bg-secondary py-12">
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="text-3xl font-bold">2.5 Million+</div>
            <div className="text-muted-foreground">MCQs Generated</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="text-3xl font-bold">1.5 Million+</div>
            <div className="text-muted-foreground">True/False Questions</div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="text-3xl font-bold">300k+</div>
            <div className="text-muted-foreground">Hours Saved</div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="container py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Quiz Me's Top Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform supports a wide range of quiz types and input formats to meet all your assessment needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <FileText className="h-8 w-8" />,
              title: "Various Quiz Types",
              description: "Generate MCQs, True/False questions, Fill-in-the-blanks, Match the following and more."
            },
            {
              icon: <Book className="h-8 w-8" />,
              title: "Study Mode",
              description: "Students can practice for exams with customized study sessions based on their material."
            },
            {
              icon: <Brain className="h-8 w-8" />,
              title: "Bloom's Taxonomy",
              description: "Generate questions based on different cognitive levels of Bloom's taxonomy."
            },
            {
              icon: <Video className="h-8 w-8" />,
              title: "Video to Quiz",
              description: "Upload videos and automatically generate relevant quiz questions."
            },
            {
              icon: <LinkIcon className="h-8 w-8" />,
              title: "Website to Quiz",
              description: "Paste any URL and get instant quiz questions from the content."
            },
            {
              icon: <Download className="h-8 w-8" />,
              title: "Multiple Export Formats",
              description: "Export quizzes as PDF, QTI, Moodle XML, CSV, and text formats."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* How It Works */}
      <section id="how-it-works" className="bg-secondary/50 py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Generate high-quality quizzes in just a few simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Input Your Content</h3>
              <p className="text-muted-foreground">
                Enter text, upload documents, or provide a URL containing your content.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Generates Questions</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your content and creates relevant quiz questions instantly.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Edit and Export</h3>
              <p className="text-muted-foreground">
                Review, edit, and export your quiz in your preferred format.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* For Who */}
      <section id="for-who" className="container py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Who is Quiz Me for?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our platform serves a wide range of users across various domains.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card rounded-lg p-8 shadow-sm border hover:shadow-md transition-shadow text-center">
            <h3 className="text-2xl font-semibold mb-4">Teachers & Schools</h3>
            <p className="text-muted-foreground mb-6">
              Save time creating assessments and focus more on teaching. Generate curriculum-aligned quizzes in seconds.
            </p>
            <Button variant="outline" className="w-full">
              Learn more
            </Button>
          </div>
          <div className="bg-card rounded-lg p-8 shadow-sm border hover:shadow-md transition-shadow text-center">
            <h3 className="text-2xl font-semibold mb-4">Students</h3>
            <p className="text-muted-foreground mb-6">
              Create practice quizzes from your study materials to better prepare for exams and test your knowledge.
            </p>
            <Button variant="outline" className="w-full">
              Learn more
            </Button>
          </div>
          <div className="bg-card rounded-lg p-8 shadow-sm border hover:shadow-md transition-shadow text-center">
            <h3 className="text-2xl font-semibold mb-4">HR Teams</h3>
            <p className="text-muted-foreground mb-6">
              Quickly create assessments for candidate screening or employee training and development programs.
            </p>
            <Button variant="outline" className="w-full">
              Learn more
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 max-w-2xl mx-auto">
            Ready to revolutionize how you create quizzes?
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join 150,000+ users who are saving hundreds of hours every month.
          </p>
          <Button size="lg" variant="secondary" className="px-8 py-6 text-lg">
            Start for free today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="mt-4 text-primary-foreground/75">
            No credit card required. Free plan available.
          </p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold text-xl">
                <Brain className="h-6 w-6 text-primary" />
                <span>Quiz Me</span>
              </div>
              <p className="text-muted-foreground">
                The ultimate AI-powered quiz generation platform for educators, students, and professionals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Testimonials</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">About</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} Quiz Me. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
