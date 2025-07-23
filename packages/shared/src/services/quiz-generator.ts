import { QuizGenerationResponse } from '../types';
import { generateQuizFromText } from './openai';

export class QuizGenerator {
  static async generateQuiz(text: string): Promise<QuizGenerationResponse> {
    try {
      console.log(`Generating quiz from ${text.length} characters of text`);
      return await generateQuizFromText(text);
    } catch (error: any) {
      console.error('Error generating quiz:', error);
      return {
        success: false,
        questions: [],
        error: error.message || 'Failed to generate quiz'
      };
    }
  }
}