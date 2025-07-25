"use client";

import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  isLoading?: boolean;
}

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  isLoading = false
}: StatsCardProps) {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 bg-primary/10 rounded-md">
          <Icon size={18} className="text-primary" />
        </div>
      </div>
      
      {isLoading ? (
        <div className="mt-2 h-8 w-16 bg-muted rounded animate-pulse"></div>
      ) : (
        <p className="mt-2 text-3xl font-bold">{value}</p>
      )}
      
      {description && !isLoading && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      {isLoading && <div className="mt-1 h-4 w-24 bg-muted rounded animate-pulse"></div>}
    </div>
  );
}
