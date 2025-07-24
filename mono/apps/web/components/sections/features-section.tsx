"use client";

import { CheckCircle2, Book, Download, Video, FileText, Link as LinkIcon, Search, UploadCloud } from "lucide-react";

export function FeaturesSection() {
  return (
    <section id="features" className="container py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Quiz Me's Top Features</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Our AI-powered platform supports a wide range of quiz types and input formats to meet all your assessment needs.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-6 border rounded-lg space-y-3">
          <FileText className="h-8 w-8 text-primary" />
          <h3 className="text-xl font-semibold">Text & Document Input</h3>
          <p className="text-muted-foreground">Upload or paste text, Word docs, or PDFs to generate quizzes instantly.</p>
        </div>
        
        <div className="p-6 border rounded-lg space-y-3">
          <Video className="h-8 w-8 text-primary" />
          <h3 className="text-xl font-semibold">Video Processing</h3>
          <p className="text-muted-foreground">Generate quizzes from YouTube videos or uploaded video content.</p>
        </div>
        
        <div className="p-6 border rounded-lg space-y-3">
          <LinkIcon className="h-8 w-8 text-primary" />
          <h3 className="text-xl font-semibold">Website URL Input</h3>
          <p className="text-muted-foreground">Paste any website URL to convert its content into quizzes automatically.</p>
        </div>
        
        <div className="p-6 border rounded-lg space-y-3">
          <Search className="h-8 w-8 text-primary" />
          <h3 className="text-xl font-semibold">Multiple Quiz Types</h3>
          <p className="text-muted-foreground">Create multiple-choice, true/false, fill-in-the-blanks, and matching questions.</p>
        </div>
        
        <div className="p-6 border rounded-lg space-y-3">
          <UploadCloud className="h-8 w-8 text-primary" />
          <h3 className="text-xl font-semibold">Cloud Storage</h3>
          <p className="text-muted-foreground">Securely store all your quizzes in the cloud for easy access anywhere.</p>
        </div>
        
        <div className="p-6 border rounded-lg space-y-3">
          <Download className="h-8 w-8 text-primary" />
          <h3 className="text-xl font-semibold">Multiple Export Options</h3>
          <p className="text-muted-foreground">Export quizzes as PDF, Word, or directly to learning management systems.</p>
        </div>
      </div>
    </section>
  );
}
