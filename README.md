# QuizMe Monorepo

A modern quiz application built with Turborepo, featuring both web and mobile applications with shared utilities.

## Structure

```
/apps
  /web         --> Next.js web application
  /mobile      --> React Native mobile application
/packages
  /shared      --> Shared TypeScript utilities, API clients, models, etc.
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.example` to `.env` in the root directory
   - Add your OpenAI API key and Supabase credentials

3. Start development servers:
```bash
# Start all apps in development mode
npm run dev

# Or start individual apps
cd apps/web && npm run dev
cd apps/mobile && npm run start
```

## Available Scripts

- `npm run dev` - Start all applications in development mode
- `npm run build` - Build all applications
- `npm run lint` - Lint all applications
- `npm run clean` - Clean all build artifacts
- `npm run type-check` - Run TypeScript type checking

## Applications

### Web App (`/apps/web`)
- Built with Next.js 14
- Uses Tailwind CSS for styling
- Responsive design for desktop and mobile browsers

### Mobile App (`/apps/mobile`)
- Built with React Native and Expo
- Cross-platform (iOS, Android, Web)
- Native mobile experience

### Shared Package (`/packages/shared`)
- Common TypeScript utilities
- API clients (OpenAI, Supabase)
- Shared types and interfaces
- Validation and formatting utilities

## Features

- **Quiz Generation**: Create quizzes from text content using OpenAI
- **Cross-Platform**: Web and mobile applications
- **Shared Logic**: Common utilities and services
- **Type Safety**: Full TypeScript support
- **Modern Tooling**: Turborepo for monorepo management

## Environment Variables

Create a `.env` file in the root directory:

```
OPENAI_API_KEY=your_openai_api_key
EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key

SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```