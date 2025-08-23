"use client";

import { useState } from "react";
import { Activity, BookOpen, Share2, RefreshCw } from "lucide-react";
import { StatsCard } from "../../../components/dashboard/stats-card";
import { useDashboardData } from "../../../hooks/use-dashboard-data";
import { formatDistanceToNow } from "date-fns";

import { LoadingSpinner } from "../../../components/ui/loading-spinner";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { data, isLoading, error, refresh } = useDashboardData();
  const [refreshSuccess, setRefreshSuccess] = useState(false);
  
  const handleRefresh = async () => {
    await refresh();
    setRefreshSuccess(true);
    setTimeout(() => setRefreshSuccess(false), 2000);
  };

  const formattedQuizzes = data?.quizzes || [];
  const stats = data?.stats || {
    averageScore: 0,
    totalAttempts: 0,
    totalQuizzesCreated: 0,
    uniqueQuizzesTaken: 0
  };

  const handleViewQuiz = (quizId: string) => {
    router.push(`/quizzes/${quizId}`);
  };
  
  const handleCreateQuiz = () => {
    router.push("/quizzes/create");
  };
  
  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-4">
          Unable to load your dashboard data. Please try again later.
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <button 
          onClick={handleRefresh}
          className={`inline-flex items-center justify-center rounded-full p-2 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${refreshSuccess ? 'bg-green-100 text-green-600' : isLoading ? 'bg-blue-100 text-blue-600 animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105 active:scale-95'}`}
          disabled={isLoading}
          aria-label="Refresh data"
          title="Refresh dashboard data"
        >
          <RefreshCw 
            className={`h-5 w-5 ${isLoading ? 'animate-spin' : refreshSuccess ? 'animate-bounce' : 'hover:rotate-180 transition-transform duration-500'}`}
          />
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard 
              title="Average Score" 
              value={isLoading ? "--" : `${Math.round(stats.averageScore)}%`} 
              icon={BookOpen}
              description="Your quiz performance"
              isLoading={isLoading}
            />
            <StatsCard 
              title="Total Attempts" 
              value={isLoading ? "--" : stats.totalAttempts} 
              icon={Activity}
              description={`Across ${stats.uniqueQuizzesTaken} unique quizzes`}
              isLoading={isLoading}
            />
            <StatsCard 
              title="Total Quizzes" 
              value={isLoading ? "--" : stats.totalQuizzesCreated} 
              icon={Share2}
              description="Quizzes you've created"
              isLoading={isLoading}
            />
          </div>
          
          {/* Quiz List */}
          {isLoading ? (
            <div className="space-y-4 py-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex animate-pulse items-center space-x-4">
                  <div className="h-12 w-full rounded bg-gray-200"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              {formattedQuizzes.length > 0 ? (
                <div className="divide-y">
                  {formattedQuizzes.map((quiz) => (
                    <div 
                      key={quiz.id}
                      className="flex flex-col sm:flex-row sm:items-center py-4 gap-2 sm:gap-4"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{quiz.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {quiz.description || "No description"}
                          {quiz.created_at && (
                            <span className="ml-2 text-xs">
                              Created {formatDistanceToNow(new Date(quiz.created_at), { addSuffix: true })}
                            </span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                          <span className="font-medium">{quiz.questionsCount}</span>
                          <span className="text-xs text-muted-foreground">Questions</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-medium">{quiz.attemptCount || 0}</span>
                          <span className="text-xs text-muted-foreground">Attempts</span>
                        </div>

                        <button 
                          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                          onClick={() => handleViewQuiz(quiz.id)}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center">
                  <p className="text-muted-foreground">You haven't created any quizzes yet.</p>
                </div>
              )}
              
              <div className="mt-6 flex justify-end border-t pt-4">
                <button 
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  onClick={handleCreateQuiz}
                >
                  Create New Quiz
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
