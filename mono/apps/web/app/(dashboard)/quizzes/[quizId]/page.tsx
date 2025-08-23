"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { quizApi } from "@/services/supabase/index";
import { useAuth } from "@/context/auth-context";
import { formatDistanceToNow } from "date-fns";

export default function QuizDetailPage({ params }: { params: { quizId: string } }) {
  const { user } = useAuth();
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        // You'll need to implement getQuizById in your quizApi
        const quizData = await quizApi.getQuizById(params.quizId);
        setQuiz(quizData);
      } catch (err: any) {
        console.error('Error fetching quiz:', err);
        setError('Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [params.quizId, user]);

  if (loading) {
    return <div className="p-8 text-center">Loading quiz...</div>;
  }

  if (error || !quiz) {
    return (
      <div className="p-8 text-center">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          {error || 'Quiz not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{quiz.title}</h1>
        <div className="flex gap-2">
          <Button variant="outline">Edit Quiz</Button>
          <Button>Start Quiz</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-border rounded-lg p-6 bg-card shadow-sm">
          <div className="text-2xl font-bold">{quiz.questions?.length || 0}</div>
          <div className="text-muted-foreground">Questions</div>
        </div>
        
        <div className="border border-border rounded-lg p-6 bg-card shadow-sm">
          <div className="text-2xl font-bold">{quiz.category || 'General'}</div>
          <div className="text-muted-foreground">Category</div>
        </div>
        
        <div className="border border-border rounded-lg p-6 bg-card shadow-sm">
          <div className="text-2xl font-bold">
            {quiz.created_at ? formatDistanceToNow(new Date(quiz.created_at), { addSuffix: true }) : 'Unknown'}
          </div>
          <div className="text-muted-foreground">Created</div>
        </div>
      </div>
      
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <div className="bg-muted px-6 py-3 text-sm font-medium">
          Quiz Questions
        </div>
        <div className="p-6 space-y-4">
          {quiz.questions && quiz.questions.length > 0 ? (
            quiz.questions.map((question: any, index: number) => (
              <div key={question.id} className="p-4 border border-border rounded-lg bg-background">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Question {index + 1}</h3>
                  <div className="text-sm text-muted-foreground">{question.type || 'Multiple Choice'}</div>
                </div>
                <p className="my-2">{question.question_text}</p>
                {question.options && (
                  <div className="space-y-2 mt-4">
                    {question.options.map((option: string, optionIndex: number) => (
                      <div key={optionIndex} className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs">
                          {String.fromCharCode(65 + optionIndex)}
                        </div>
                        <div>{option}</div>
                        {question.correct_answer === optionIndex && (
                          <span className="ml-2 text-primary flex items-center text-sm">
                            <Check size={14} className="mr-1" />
                            <span>Correct</span>
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No questions found for this quiz.
            </div>
          )}
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button variant="outline">Export Quiz</Button>
      </div>
    </div>
  );
}
