// Using default values for environment variables
// Removed dotenv dependency as it's not compatible with React Native
let localEnv = {};

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
    AI_MODEL: process.env.AI_MODEL || localEnv.AI_MODEL || 'open_ai',
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || localEnv.OPENAI_API_KEY,
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
