import { OpenAI } from 'openai';
import { OPENAI_API_KEY } from '../config';

interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
}

interface QuizGenerationResponse {
    success: boolean;
    questions: QuizQuestion[];
    error?: string;
}

export async function generateQuizFromText(text: string): Promise<QuizGenerationResponse> {
    try {
        if (!OPENAI_API_KEY) {
            return {
                success: false,
                questions: [],
                error: 'OpenAI API key not found. Please add OPENAI_API_KEY to your environment variables.'
            };
        }

        // Initialize OpenAI client
        const client = new OpenAI({
            apiKey: OPENAI_API_KEY,
            dangerouslyAllowBrowser: true
        });

        // Create prompt for quiz generation
        const prompt = `
      Generate a quiz with 5 questions based on the following text. 
      For each question, provide 4 options with exactly one correct answer. 
      Format your response as a JSON object with a "questions" array like this:
      {
        "questions": [
          {
            "question": "Question text here",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": 0
          },
          {  
            "question": "Second question here",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": 1
          },
          // and so on for all 5 questions
        ]
      }

      IMPORTANT: Generate exactly 5 questions. Make sure to return a valid JSON with all 5 questions in the array.
      
      Text to generate quiz from:
      ${text}
    `;

        // Generate quiz using chat completions
        const response = await client.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: 'gpt-3.5-turbo',  // Using gpt-3.5-turbo which is more widely available
            response_format: { type: 'json_object' },
            temperature: 0.7 // Add some creativity but keep responses consistent
        });

        // Parse response
        const responseText = response.choices[0]?.message?.content || '{}';

        try {
            const parsedResponse = JSON.parse(responseText);
            console.log("parsedResponse", parsedResponse);

            // Handle different possible response formats
            let questions: QuizQuestion[] = [];

            if (Array.isArray(parsedResponse)) {
                questions = parsedResponse;
            } else if (parsedResponse.questions && Array.isArray(parsedResponse.questions)) {
                questions = parsedResponse.questions;
            } else {
                return {
                    success: false,
                    questions: [],
                    error: 'Invalid response format from OpenAI'
                };
            }

            // Validate that we have multiple questions
            if (questions.length < 2 && typeof parsedResponse === 'object' && !Array.isArray(parsedResponse) && !parsedResponse.questions) {
                questions = [parsedResponse as unknown as QuizQuestion];
            }

            return {
                success: true,
                questions: questions
            };
        } catch (parseError) {
            return {
                success: false,
                questions: [],
                error: 'Failed to parse OpenAI response'
            };
        }
    } catch (error: any) {
        return {
            success: false,
            questions: [],
            error: error.message || 'Unknown error occurred'
        };
    }
}
