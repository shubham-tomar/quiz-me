"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../context/auth-context';
import { quizApi, attemptApi } from '../services/supabase/index';
import { UserStats } from '../services/supabase/attempts';
import { Quiz, QuizWithStats } from '../lib/supabase/types';

// Re-export UserStats as DashboardStats for consistency
export type DashboardStats = UserStats;

export type DashboardData = {
  quizzes: QuizWithStats[];
  stats: DashboardStats;
};

export function useDashboardData() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        
        // Fetch quizzes with stats using our service
        const quizzes = await quizApi.getQuizWithStats(user.id);
        
        // Fetch user attempt stats using our service
        const stats = await attemptApi.getUserStats(user.id);
        
        // Use type assertion to ensure TypeScript recognizes the structure
        const typedStats: UserStats = {
          totalAttempts: stats.totalAttempts || 0,
          averageScore: stats.averageScore || 0,
          uniqueQuizzesTaken: stats.uniqueQuizzesTaken || 0,
          // Use optional chaining and nullish coalescing to safely access property
          totalQuizzesCreated: (stats as any).totalQuizzesCreated || 0
        };
        
        setData({ quizzes, stats: typedStats });
      } catch (err: any) {
        console.error('Error fetching dashboard data:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  return { data, isLoading, error };
}
