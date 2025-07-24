"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { QuizCard } from "./quiz-card";
import { Button } from "@/components/ui/button";

interface Quiz {
  id: string;
  title: string;
  description: string;
  questionsCount: number;
  createdAt: string;
}

interface QuizListProps {
  initialQuizzes?: Quiz[];
}

export function QuizList({ initialQuizzes = [] }: QuizListProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes);
  
  const handleDelete = async (id: string) => {
    // In a real implementation, this would call an API
    // For now, we'll just filter the quizzes array
    setQuizzes(quizzes.filter(quiz => quiz.id !== id));
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Quizzes</h2>
        <Link href="/quizzes/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Quiz
          </Button>
        </Link>
      </div>
      
      {quizzes.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">No quizzes yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first quiz to get started
          </p>
          <Link href="/quizzes/create">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Quiz
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <QuizCard 
              key={quiz.id} 
              {...quiz} 
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
