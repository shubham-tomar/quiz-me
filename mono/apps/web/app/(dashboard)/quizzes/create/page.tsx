"use client";

import { QuizForm } from "@/components/forms/quiz-form";

export default function CreateQuizPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Create Quiz</h1>
      </div>
      
      <div className="border rounded-lg p-6 bg-background">
        <QuizForm />
      </div>
    </div>
  );
}
