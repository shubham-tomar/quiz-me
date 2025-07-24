"use client";

import { useState } from "react";
import { Check, Edit, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuestionCardProps {
  id: string;
  text: string;
  options: Option[];
  type: "multiple" | "truefalse" | "fillblank";
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
}

export function QuestionCard({
  id,
  text,
  options,
  type,
  onDelete,
  onEdit
}: QuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg bg-white overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="font-medium">{text}</div>
          <div className="flex gap-2">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(id)}
                className="h-8 w-8 p-0"
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(id)}
                className="h-8 w-8 p-0 hover:text-destructive"
              >
                <Trash className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            )}
          </div>
        </div>

        <div className="mt-1 text-xs text-gray-500 flex items-center">
          <span className={`inline-block rounded px-2 py-1 text-xs ${
            type === "multiple" ? "bg-blue-100 text-blue-800" : 
            type === "truefalse" ? "bg-green-100 text-green-800" : 
            "bg-purple-100 text-purple-800"
          }`}>
            {type === "multiple" ? "Multiple Choice" : 
             type === "truefalse" ? "True/False" : 
             "Fill in the Blank"}
          </span>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-2 text-primary text-xs hover:underline"
          >
            {isExpanded ? "Hide" : "Show"} answers
          </button>
        </div>
        
        {isExpanded && (
          <div className="mt-4 space-y-2">
            {options.map((option) => (
              <div 
                key={option.id} 
                className={`flex items-center p-2 rounded ${
                  option.isCorrect ? "bg-green-50 border border-green-200" : "bg-gray-50"
                }`}
              >
                <div className="flex-1">{option.text}</div>
                {option.isCorrect ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <X className="h-4 w-4 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
