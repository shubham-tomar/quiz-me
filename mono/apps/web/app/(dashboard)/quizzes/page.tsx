"use client";

import { QuizList } from "@/components/dashboard/quiz-list";

// Sample data - in a real app, this would come from an API
const sampleQuizzes = [
  {
    id: "1",
    title: "Biology Chapter 5",
    description: "Essential concepts from chapter 5 of the biology textbook",
    questionsCount: 15,
    createdAt: "2 days ago"
  },
  {
    id: "2",
    title: "World History Quiz",
    description: "Key events and figures from world history",
    questionsCount: 20,
    createdAt: "1 week ago"
  },
  {
    id: "3",
    title: "Math Fundamentals",
    description: "Basic principles of algebra and geometry",
    questionsCount: 12,
    createdAt: "3 days ago"
  },
  {
    id: "4",
    title: "Literature Quiz",
    description: "Classic literature and famous authors",
    questionsCount: 25,
    createdAt: "5 days ago"
  },
  {
    id: "5",
    title: "Computer Science Basics",
    description: "Fundamental concepts in computer science",
    questionsCount: 18,
    createdAt: "1 day ago"
  }
];

export default function QuizzesPage() {
  return (
    <div className="space-y-6">
      <QuizList initialQuizzes={sampleQuizzes} />
    </div>
  );
}
