"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function QuizDetailPage({ params }: { params: { quizId: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Biology Chapter 5 Quiz</h1>
        <div className="flex gap-2">
          <Button variant="outline">Edit Quiz</Button>
          <Button>Start Quiz</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-lg p-6 bg-background">
          <div className="text-2xl font-bold">15</div>
          <div className="text-muted-foreground">Questions</div>
        </div>
        
        <div className="border rounded-lg p-6 bg-background">
          <div className="text-2xl font-bold">Science</div>
          <div className="text-muted-foreground">Category</div>
        </div>
        
        <div className="border rounded-lg p-6 bg-background">
          <div className="text-2xl font-bold">2 days ago</div>
          <div className="text-muted-foreground">Created</div>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-muted px-6 py-3 text-sm font-medium">
          Quiz Questions
        </div>
        <div className="p-6 space-y-4">
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-medium">Question {num}</h3>
                <div className="text-sm text-muted-foreground">Multiple Choice</div>
              </div>
              <p className="my-2">What is the function of mitochondria in a cell?</p>
              <div className="space-y-2 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border flex items-center justify-center text-xs">A</div>
                  <div>Energy production</div>
                  {num % 5 === 1 && <span className="ml-2 text-green-600 text-sm">(Correct)</span>}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border flex items-center justify-center text-xs">B</div>
                  <div>Protein synthesis</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border flex items-center justify-center text-xs">C</div>
                  <div>Cell division</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border flex items-center justify-center text-xs">D</div>
                  <div>Waste removal</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button variant="outline">Export Quiz</Button>
      </div>
    </div>
  );
}
