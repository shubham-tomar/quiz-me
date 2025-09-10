"use client";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full py-20 marketing-features-bg">
      <div className="container text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">How Quiz Me Works</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Generate comprehensive quizzes in just three simple steps.
        </p>
      </div>
      
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="marketing-step-card p-6 rounded-lg text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-xl font-bold">1</div>
          <h3 className="text-xl font-semibold">Upload Your Content</h3>
          <p className="text-muted-foreground">Upload text, PDFs, videos, or paste a URL containing the content you want to transform into a quiz.</p>
        </div>
        
        <div className="marketing-step-card p-6 rounded-lg text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-xl font-bold">2</div>
          <h3 className="text-xl font-semibold">AI Processing</h3>
          <p className="text-muted-foreground">Our advanced AI analyzes your content to identify key concepts and generate relevant questions.</p>
        </div>
        
        <div className="marketing-step-card p-6 rounded-lg text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto text-xl font-bold">3</div>
          <h3 className="text-xl font-semibold">Get Your Quiz</h3>
          <p className="text-muted-foreground">Review, edit if needed, and download your quiz in your preferred format or share directly.</p>
        </div>
      </div>
    </section>
  );
}
