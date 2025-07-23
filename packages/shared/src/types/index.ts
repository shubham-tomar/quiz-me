export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

export interface QuizGenerationResponse {
  success: boolean;
  questions: QuizQuestion[];
  error?: string;
}

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

export interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    username?: string;
  };
}