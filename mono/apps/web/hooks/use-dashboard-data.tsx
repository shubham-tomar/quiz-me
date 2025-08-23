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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    if (!user) {
      console.log('Dashboard: No user found, skipping data fetch');
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      console.log('Dashboard: Fetching data for user:', user.id);
      
      // Fetch quizzes with stats using our service
      const quizzes = await quizApi.getQuizWithStats(user.id);
      console.log('Dashboard: Fetched quizzes:', quizzes.length);
      
      // Fetch user attempt stats using our service
      const stats = await attemptApi.getUserStats(user.id);
      console.log('Dashboard: Fetched stats:', stats);
      
      // Use type assertion to ensure TypeScript recognizes the structure
      const typedStats: UserStats = {
        totalAttempts: stats.totalAttempts || 0,
        averageScore: stats.averageScore || 0,
        uniqueQuizzesTaken: stats.uniqueQuizzesTaken || 0,
        // Use optional chaining and nullish coalescing to safely access property
        totalQuizzesCreated: (stats as any).totalQuizzesCreated || 0
      };
      
      setData({ quizzes, stats: typedStats });
      console.log('Dashboard: Data set successfully');
    } catch (err: any) {
      console.error('Error fetching dashboard data:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on initial mount only
  useEffect(() => {
    if (!data && user) {
      fetchData();
    }
  }, [user]);

  return { data, isLoading, error, refresh: fetchData };
}
