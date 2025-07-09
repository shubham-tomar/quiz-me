import * as openAI from './open_ai';
import * as customAI from './custom_ai';
import * as anthropicAI from './anthropic_ai';
import { AI_MODEL } from '../config';

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

export async function generateQuiz(text: string): Promise<QuizGenerationResponse> {
  // Get the AI model from config with fallback to prevent undefined
  const aiModel = AI_MODEL || 'open_ai';

  console.log(`Using AI model: ${aiModel}`);

  try {
    console.log(`Generating quiz from ${text.length} characters of text`);
    switch (aiModel.toLowerCase()) {
      case 'open_ai':
        return await openAI.generateQuizFromText(text);
      case 'custom_ai':
        return await customAI.generateQuizFromText(text);
      case 'anthropic_ai':
        return await anthropicAI.generateQuizFromText(text);
      default:
        // Default to OpenAI if no valid model is specified
        return await openAI.generateQuizFromText(text);
    }
  } catch (error: any) {
    console.error(`Error generating quiz with ${aiModel}:`, error);
    return {
      success: false,
      questions: [],
      error: error.message || `Failed to generate quiz using ${aiModel}`
    };
  }
}
