"use client";

import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend 
}: StatsCardProps) {
  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h4 className="mt-2 text-2xl font-semibold">{value}</h4>
          
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
          
          {trend && (
            <div className="mt-2 flex items-center">
              <span className={`text-sm font-medium ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="ml-2 text-xs text-gray-500">from last period</span>
            </div>
          )}
        </div>
        
        <div className="p-3 bg-gray-50 rounded-full">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
}
