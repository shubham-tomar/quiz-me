"use client";

export function LoadingSpinner({ size = "md", className = "" }: { size?: "sm" | "md" | "lg", className?: string }) {
  const sizeClass = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3", 
    lg: "h-12 w-12 border-4"
  };

  return (
    <div className={`${className}`}>
      <div className={`animate-spin rounded-full border-t-transparent border-primary ${sizeClass[size]}`} />
    </div>
  );
}
