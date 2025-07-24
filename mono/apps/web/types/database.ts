export type Quiz = {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  source?: string;
  created_at: string;
};

export type Question = {
  id: string;
  quiz_id: string;
  question: string;
  correct_ans: number;
  user_ans?: number;
  options: string[];
  explanation?: string;
};

export type Attempt = {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  submitted_at: string;
};

export type QuizWithStats = Quiz & {
  questionsCount: number;
  attemptCount?: number;
  averageScore?: number;
  lastAttemptedAt?: string;
  description?: string;
};
