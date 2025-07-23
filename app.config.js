require('dotenv').config();

module.exports = {
  name: "QuizMe",
  slug: "quizme",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "quizme",
  userInterfaceStyle: "automatic",
  extra: {
    // Add environment variables here so they're accessible via Constants.manifest.extra
    EXPO_PUBLIC_AI_MODEL: process.env.EXPO_PUBLIC_AI_MODEL || 'open_ai',
    EXPO_PUBLIC_OPENAI_API_KEY: process.env.EXPO_PUBLIC_OPENAI_API_KEY || '',
    EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key',
  },
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    edgeToEdgeEnabled: true
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png"
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        "resizeMode": "contain",
        "backgroundColor": "#ffffff"
      }
    ]
  ]
};
