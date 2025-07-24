"use client";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 py-12">
      <div className="max-w-md w-full bg-background p-8 rounded-lg shadow-sm">
        {children}
      </div>
    </div>
  );
}
