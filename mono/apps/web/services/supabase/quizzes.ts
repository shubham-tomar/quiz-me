import { supabase } from '../../lib/supabase/client';
import { Quiz, QuizWithStats } from '../../lib/supabase/types';

export const quizApi = {
  async getUserQuizzes(userId: string): Promise<Quiz[]> {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
  },
  
  async getQuizWithStats(userId: string): Promise<QuizWithStats[]> {
    // Get quizzes with question counts
    const { data: quizzes, error: quizzesError } = await supabase
      .from('quizzes')
      .select(`
        *,
        questions:questions(count)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
      
    if (quizzesError) throw quizzesError;
    
    // Get quiz IDs to fetch attempt data
    const quizIds = quizzes?.map((quiz: any) => quiz.id) || [];
    const { data: attempts, error: attemptsError } = await supabase
      .from('attempts')
      .select('*')
      .in('quiz_id', quizIds)
      .order('submitted_at', { ascending: false });
    
    if (attemptsError) throw attemptsError;
    
    // Process and combine the data
    const quizzesWithStats = quizzes?.map((quiz: any) => {
      const quizAttempts = attempts?.filter((attempt: any) => attempt.quiz_id === quiz.id) || [];
      
      return {
        ...quiz,
        questionsCount: quiz.questions[0]?.count || 0,
        attemptCount: quizAttempts.length,
        averageScore: quizAttempts.length ? 
          quizAttempts.reduce((sum: number, attempt: any) => sum + attempt.score, 0) / quizAttempts.length : 
          undefined,
        lastAttemptedAt: quizAttempts[0]?.submitted_at
      };
    });
    
    return quizzesWithStats || [];
  }
};
