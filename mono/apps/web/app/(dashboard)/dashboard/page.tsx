"use client";

import { Activity, BookOpen, Share2 } from "lucide-react";
import { ProfileCard } from "@/components/dashboard/profile-card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { QuizList } from "@/components/dashboard/quiz-list";

// Sample data - in a real app, this would come from an API
const sampleQuizzes = [
  {
    id: "1",
    title: "JavaScript Basics",
    description: "Fundamental concepts of JavaScript programming language",
    questionsCount: 15,
    createdAt: "2 days ago"
  },
  {
    id: "2",
    title: "React Hooks",
    description: "Understanding React hooks and their usage patterns",
    questionsCount: 10,
    createdAt: "3 days ago"
  },
  {
    id: "3",
    title: "TypeScript Advanced",
    description: "Advanced types, generics, and utility types in TypeScript",
    questionsCount: 20,
    createdAt: "1 week ago"
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard 
              title="Total Quizzes" 
              value={12} 
              icon={BookOpen} 
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard 
              title="Questions Generated" 
              value={148} 
              icon={Activity} 
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard 
              title="Times Shared" 
              value={36} 
              icon={Share2} 
              trend={{ value: 5, isPositive: true }}
            />
          </div>
          
          {/* Quiz List */}
          <QuizList initialQuizzes={sampleQuizzes} />
        </div>
        
        <div>
          <ProfileCard />
        </div>
      </div>
    </div>
  );
}
