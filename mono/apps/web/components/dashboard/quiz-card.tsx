"use client";

import Link from "next/link";
import { CalendarDays, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuizCardProps {
  id: string;
  title: string;
  description: string;
  questionsCount: number;
  createdAt: string;
  onDelete?: (id: string) => void;
}

export function QuizCard({ 
  id, 
  title, 
  description, 
  questionsCount, 
  createdAt, 
  onDelete 
}: QuizCardProps) {
  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-medium truncate">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>
        
        <div className="flex items-center mt-4 text-sm text-gray-500">
          <CalendarDays className="h-4 w-4 mr-1" />
          <span>{createdAt}</span>
          <span className="mx-2">•</span>
          <span>{questionsCount} questions</span>
        </div>
      </div>
      
      <div className="px-6 py-3 bg-gray-50 flex justify-between">
        <Link href={`/quizzes/${id}`}>
          <Button variant="outline" size="sm">
            View
          </Button>
        </Link>
        
        <div className="space-x-2">
          <Link href={`/quizzes/${id}/edit`}>
            <Button variant="ghost" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          
          {onDelete && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onDelete(id)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
