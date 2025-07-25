import "./globals.css";
import "@/styles/dark-mode-fixes.css";
import { AuthProvider } from "@/context/auth-context";
import { ThemeProvider } from "@/context/theme-context";

export const metadata = {
  title: "Quiz Me - AI-Powered Quiz Generation Platform",
  description: "Generate quizzes from text, PDFs, videos, and more instantly with AI. Perfect for teachers, students, and HR teams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
