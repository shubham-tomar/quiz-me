"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Option = {
  id: string;
  text: string;
  isCorrect: boolean;
};

type Question = {
  id: string;
  text: string;
  type: "multiple" | "truefalse" | "fillblank";
  options: Option[];
};

type Quiz = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};

interface QuizResultsProps {
  quiz: Quiz;
  answers: Record<string, string[]>;
  score: number;
  onRetake: () => void;
}

export function QuizResults({ 
  quiz, 
  answers, 
  score,
  onRetake
}: QuizResultsProps) {
  const [showAnswers, setShowAnswers] = useState(false);
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const isAnswerCorrect = (question: Question) => {
    const userAnswers = answers[question.id] || [];
    const correctOptions = question.options
      .filter(option => option.isCorrect)
      .map(option => option.id);
      
    return (
      userAnswers.length === correctOptions.length &&
      userAnswers.every(id => correctOptions.includes(id))
    );
  };

  const isOptionSelected = (questionId: string, optionId: string) => {
    return (answers[questionId] || []).includes(optionId);
  };
  
  const getSuccessMessage = (score: number) => {
    if (score >= 90) return "Excellent! You've mastered this quiz!";
    if (score >= 80) return "Great job! Very good understanding!";
    if (score >= 70) return "Good work! You're on the right track.";
    if (score >= 60) return "Not bad! With a little more study, you'll improve.";
    return "Keep practicing! You'll get better with more study.";
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">{quiz.title} - Results</h1>
        <div className="text-lg">
          Your score: <span className={`font-bold ${getScoreColor(score)}`}>{score}%</span>
        </div>
        <p className="text-gray-600 mt-2">{getSuccessMessage(score)}</p>
      </div>
      
      <div className="bg-white rounded-lg border p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Summary</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowAnswers(!showAnswers)}>
              {showAnswers ? "Hide Answers" : "Show Answers"}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download Results
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Total Questions</div>
            <div className="text-2xl font-bold">{quiz.questions.length}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Correct Answers</div>
            <div className="text-2xl font-bold">
              {quiz.questions.filter(q => isAnswerCorrect(q)).length}
            </div>
          </div>
        </div>
        
        {showAnswers && (
          <div className="space-y-6 mt-6">
            {quiz.questions.map((question, index) => {
              const correct = isAnswerCorrect(question);
              
              return (
                <div 
                  key={question.id} 
                  className={`p-4 border rounded-lg ${correct ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                >
                  <div className="flex items-start gap-2">
                    {correct ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-medium">
                        {index + 1}. {question.text}
                      </div>
                      
                      <div className="mt-2 ml-1 space-y-1">
                        {question.options.map(option => {
                          const selected = isOptionSelected(question.id, option.id);
                          let optionClass = "";
                          
                          if (option.isCorrect) {
                            optionClass = "text-green-700";
                          } else if (selected && !option.isCorrect) {
                            optionClass = "text-red-700";
                          }
                          
                          return (
                            <div 
                              key={option.id} 
                              className={`flex items-center text-sm ${optionClass}`}
                            >
                              <div className="w-4 h-4 mr-2">
                                {option.isCorrect && selected && (
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                )}
                                {option.isCorrect && !selected && (
                                  <CheckCircle2 className="h-4 w-4 text-green-600 opacity-60" />
                                )}
                                {!option.isCorrect && selected && (
                                  <XCircle className="h-4 w-4 text-red-600" />
                                )}
                              </div>
                              {option.text}
                              {option.isCorrect && !selected && (
                                <span className="ml-1 text-xs text-green-700">(correct answer)</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onRetake}>
          Retake Quiz
        </Button>
        <Link href={`/quizzes`}>
          <Button>
            Back to Quizzes
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
