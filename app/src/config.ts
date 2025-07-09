import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Removed dotenv import as it's not compatible with React Native

// Access environment variables based on platform
export const getEnvVar = (name: string): string | undefined => {
  let value: string | undefined;
  
  // For Expo apps
  if (Constants?.manifest?.extra) {
    value = Constants.manifest.extra[name];
  }

  // For server-side/Node.js
  if (!value && typeof process !== 'undefined' && process.env) {
    value = process.env[name];
  }
  
  return value;
};

// AI Model selection
export const AI_MODEL = getEnvVar('EXPO_PUBLIC_AI_MODEL');
export const OPENAI_API_KEY = getEnvVar('EXPO_PUBLIC_OPENAI_API_KEY');

// App configuration
export const config = {
  ai: {
    model: AI_MODEL,
    apiKey: OPENAI_API_KEY,
  }
};
