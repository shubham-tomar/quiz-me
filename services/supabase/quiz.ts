import { supabase } from './client';
import { Session } from '@supabase/supabase-js';

export interface Quiz {
  id: string;
  user_id: string;
  title: string;
  source?: string;
  created_at?: string;
  latestAttempt?: Attempt | null;
}

export interface Question {
  id: string;
  quiz_id: string;
  question: string;
  correct_ans: number;
  user_ans?: number;
  options: string[];
  explanation?: string;
}

export interface Attempt {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  submitted_at?: string;
}

// Create a new quiz
export const createQuiz = async (title: string, source?: string) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('quizzes')
      .insert([
        { title, source, user_id: session.user.id }
      ])
      .select()
      .single();
    
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

// Get all quizzes for the current user
export const getUserQuizzes = async () => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: [], error };
  }
};

// Get a specific quiz by ID
export const getQuizById = async (quizId: string) => {
  try {
    const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('id', quizId)
      .single();
    
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

// Add questions to a quiz
export const addQuestionsToQuiz = async (quizId: string, questions: Omit<Question, 'id' | 'quiz_id'>[]) => {
  try {
    const formattedQuestions = questions.map(q => ({
      ...q,
      quiz_id: quizId
    }));

    const { data, error } = await supabase
      .from('questions')
      .insert(formattedQuestions)
      .select();
    
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};

// Get questions for a specific quiz
export const getQuestionsForQuiz = async (quizId: string) => {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('quiz_id', quizId);
    
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: [], error };
  }
};

// Save a quiz attempt
export const saveQuizAttempt = async (quizId: string, score: number): Promise<{ error: Error | null }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Ensure score is a number
    const numericScore = Number(score);
    
    // Create the attempt record with submitted_at
    const attemptData = {
      quiz_id: quizId,
      user_id: user.id,
      score: numericScore,
      submitted_at: new Date().toISOString()
    };
    
    const { error } = await supabase
      .from('attempts')
      .insert(attemptData);
    
    if (error) {
      throw error;
    }
    return { error: null };
  } catch (error: any) {
    return { error };
  }
};

// Get attempt history for a user
export const getUserAttempts = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    console.log('Getting attempts for user:', user.id);

    const { data, error } = await supabase
      .from('attempts')
      .select(`
        *,
        quiz:quiz_id (
          id,
          title
        )
      `)
      .eq('user_id', user.id)
      .order('submitted_at', { ascending: false });
      
    console.log('User attempts found:', data?.length || 0);
    
    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: [], error };
  }
};

/**
 * Update user answers for questions
 * @param quizId The ID of the quiz
 * @param answers Array of objects with question ID and user's answer
 */
export const updateUserAnswers = async (
  quizId: string,
  answers: { id: string, user_ans: number }[]
): Promise<{ success: boolean, error: Error | null }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Update each question with the user's answer
    for (const answer of answers) {
      const { error } = await supabase
        .from('questions')
        .update({ user_ans: answer.user_ans })
        .eq('id', answer.id)
        .eq('quiz_id', quizId);
      
      if (error) {
        throw error;
      }
    }
    
    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error updating user answers:', error);
    return { success: false, error };
  }
};

// Delete a quiz and its associated questions
export const deleteQuiz = async (quizId: string) => {
  try {
    const { error } = await supabase
      .from('quizzes')
      .delete()
      .eq('id', quizId);
    
    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    return { error };
  }
};

// Get the latest attempt for a specific quiz
export const getLatestQuizAttempt = async (quizId: string): Promise<{ data: Attempt | null, error: Error | null }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // First check if any attempts exist
    const { count, error: countError } = await supabase
      .from('attempts')
      .select('*', { count: 'exact', head: true })
      .eq('quiz_id', quizId)
      .eq('user_id', user.id);
    
    if (countError) {
      throw countError;
    }
    
    if (count === 0) {
      return { data: null, error: null };
    }
    
    // Fetch the latest attempt
    const { data, error } = await supabase
      .from('attempts')
      .select('*')
      .eq('quiz_id', quizId)
      .eq('user_id', user.id)
      .order('submitted_at', { ascending: false })
      .limit(1)
      .single();
    
    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error: any) {
    return { data: null, error };
  }
};
