"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface QuizSessionProps {
  quiz: Quiz;
  onComplete: (results: {
    quizId: string;
    answers: Record<string, string[]>;
    score: number;
    totalQuestions: number;
  }) => void;
  onCancel: () => void;
}

export function QuizSession({ quiz, onComplete, onCancel }: QuizSessionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;
  
  const isMultipleAnswer = currentQuestion?.type === "multiple";

  const handleOptionSelect = (optionId: string) => {
    const questionId = currentQuestion.id;
    
    if (isMultipleAnswer) {
      const currentAnswers = answers[questionId] || [];
      const isSelected = currentAnswers.includes(optionId);
      
      if (isSelected) {
        setAnswers({
          ...answers,
          [questionId]: currentAnswers.filter(id => id !== optionId)
        });
      } else {
        setAnswers({
          ...answers,
          [questionId]: [...currentAnswers, optionId]
        });
      }
    } else {
      setAnswers({
        ...answers,
        [questionId]: [optionId]
      });
    }
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Calculate score
      let correctCount = 0;
      
      quiz.questions.forEach(question => {
        const userAnswers = answers[question.id] || [];
        const correctOptions = question.options
          .filter(option => option.isCorrect)
          .map(option => option.id);
          
        // For exact match between user answers and correct answers
        if (
          userAnswers.length === correctOptions.length &&
          userAnswers.every(id => correctOptions.includes(id))
        ) {
          correctCount++;
        }
      });
      
      const scorePercentage = Math.round((correctCount / quiz.questions.length) * 100);
      
      onComplete({
        quizId: quiz.id,
        answers,
        score: scorePercentage,
        totalQuestions: quiz.questions.length
      });
    } catch (error) {
      console.error("Error submitting quiz:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isQuestionAnswered = (questionId: string) => {
    return !!answers[questionId]?.length;
  };
  
  const getSelectedOptionIds = (questionId: string) => {
    return answers[questionId] || [];
  };

  if (!currentQuestion) {
    return <div>No questions found in this quiz.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{quiz.title}</h1>
        <div className="text-sm font-medium">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-primary h-2 rounded-full" 
          style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
        ></div>
      </div>
      
      <div className="bg-white rounded-lg border p-6 mb-6">
        <h2 className="text-lg font-medium mb-4">{currentQuestion.text}</h2>
        
        <div className="space-y-2">
          {currentQuestion.options.map((option) => {
            const isSelected = getSelectedOptionIds(currentQuestion.id).includes(option.id);
            
            return (
              <div 
                key={option.id} 
                className={`p-3 border rounded-lg cursor-pointer flex items-center ${
                  isSelected ? "border-primary bg-primary/10" : "hover:bg-gray-50"
                }`}
                onClick={() => handleOptionSelect(option.id)}
              >
                <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center ${
                  isSelected ? "border-primary bg-primary" : "border-gray-300"
                }`}>
                  {isSelected && <Check className="h-3 w-3 text-white" />}
                </div>
                <div className="ml-3">{option.text}</div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={isFirstQuestion ? onCancel : handlePrevious}
        >
          {isFirstQuestion ? (
            "Cancel Quiz"
          ) : (
            <>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </>
          )}
        </Button>
        
        <Button 
          onClick={isLastQuestion ? handleSubmit : handleNext}
          disabled={!isQuestionAnswered(currentQuestion.id) || isSubmitting}
        >
          {isLastQuestion ? (
            isSubmitting ? "Submitting..." : "Finish Quiz"
          ) : (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
