import { supabase } from '../../lib/supabase/client';
import { Attempt } from '../../lib/supabase/types';

export interface UserStats {
  totalAttempts: number;
  averageScore: number;
  uniqueQuizzesTaken: number;
  totalQuizzesCreated: number;
}

export const attemptApi = {
  async getUserAttempts(userId: string): Promise<Attempt[]> {
    const { data, error } = await supabase
      .from('attempts')
      .select('*')
      .eq('user_id', userId)
      .order('submitted_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
  },
  
  async getUserStats(userId: string): Promise<{
    totalAttempts: number;
    averageScore: number;
    uniqueQuizzesTaken: number;
    totalQuizzesCreated: number;
  }> {
    const { data: attempts, error } = await supabase
      .from('attempts')
      .select('*')
      .eq('user_id', userId);
      
    if (error) throw error;
    
    const totalAttempts = attempts?.length || 0;
    const averageScore = totalAttempts ? 
      attempts.reduce((sum: number, attempt: any) => sum + attempt.score, 0) / totalAttempts : 
      0;
    
    // Count unique quizzes taken
    const uniqueQuizzes = new Set(attempts?.map((attempt: any) => attempt.quiz_id));
    
    // Get total quizzes created by the user
    const { count: totalQuizzesCreated, error: quizError } = await supabase
      .from('quizzes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);
      
    if (quizError) throw quizError;
    
    return {
      totalAttempts,
      averageScore,
      uniqueQuizzesTaken: uniqueQuizzes.size,
      totalQuizzesCreated: totalQuizzesCreated || 0
    };
  }
};
