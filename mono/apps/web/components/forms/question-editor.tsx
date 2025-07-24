"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuestionEditorProps {
  initialQuestion?: {
    id?: string;
    text: string;
    type: "multiple" | "truefalse" | "fillblank";
    options: Option[];
  };
  onSave: (question: {
    id?: string;
    text: string;
    type: "multiple" | "truefalse" | "fillblank";
    options: Option[];
  }) => void;
  onCancel: () => void;
}

export function QuestionEditor({ 
  initialQuestion, 
  onSave, 
  onCancel 
}: QuestionEditorProps) {
  const [question, setQuestion] = useState(
    initialQuestion || {
      text: "",
      type: "multiple" as const,
      options: [
        { id: "1", text: "", isCorrect: false },
        { id: "2", text: "", isCorrect: false },
        { id: "3", text: "", isCorrect: false },
        { id: "4", text: "", isCorrect: false }
      ]
    }
  );

  const handleQuestionTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion({ ...question, text: e.target.value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as "multiple" | "truefalse" | "fillblank";
    let newOptions = [...question.options];
    
    if (newType === "truefalse" && question.type !== "truefalse") {
      newOptions = [
        { id: "1", text: "True", isCorrect: false },
        { id: "2", text: "False", isCorrect: false }
      ];
    } else if (newType === "multiple" && question.type !== "multiple" && question.options.length < 4) {
      while (newOptions.length < 4) {
        newOptions.push({ 
          id: (newOptions.length + 1).toString(), 
          text: "", 
          isCorrect: false 
        });
      }
    }
    
    setQuestion({ 
      ...question, 
      type: newType,
      options: newOptions
    });
  };

  const handleOptionTextChange = (id: string, text: string) => {
    setQuestion({
      ...question,
      options: question.options.map(option => 
        option.id === id ? { ...option, text } : option
      )
    });
  };

  const handleOptionCorrectChange = (id: string) => {
    setQuestion({
      ...question,
      options: question.options.map(option => 
        option.id === id 
          ? { ...option, isCorrect: !option.isCorrect }
          : question.type === "truefalse" || question.type === "multiple" 
            ? { ...option, isCorrect: false } 
            : option
      )
    });
  };

  const addOption = () => {
    if (question.options.length < 8) {
      const newId = (question.options.length + 1).toString();
      setQuestion({
        ...question,
        options: [
          ...question.options,
          { id: newId, text: "", isCorrect: false }
        ]
      });
    }
  };

  const removeOption = (id: string) => {
    if (question.options.length > 2) {
      setQuestion({
        ...question,
        options: question.options.filter(option => option.id !== id)
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(question);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Question Text
        </label>
        <textarea
          value={question.text}
          onChange={handleQuestionTextChange}
          className="w-full p-2 border rounded-md"
          rows={3}
          placeholder="Enter your question"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Question Type
        </label>
        <select
          value={question.type}
          onChange={handleTypeChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="multiple">Multiple Choice</option>
          <option value="truefalse">True/False</option>
          <option value="fillblank">Fill in the Blank</option>
        </select>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="block text-sm font-medium">
            Answer Options
          </label>
          {question.type === "multiple" && question.options.length < 8 && (
            <Button 
              type="button" 
              onClick={addOption} 
              size="sm" 
              variant="outline"
              className="flex items-center gap-1"
            >
              <Plus className="h-3 w-3" />
              Add Option
            </Button>
          )}
        </div>

        <div className="space-y-2">
          {question.options.map((option) => (
            <div key={option.id} className="flex items-center gap-2">
              <input
                type={question.type === "multiple" ? "radio" : "checkbox"}
                checked={option.isCorrect}
                onChange={() => handleOptionCorrectChange(option.id)}
                className="h-4 w-4"
              />
              <input
                value={option.text}
                onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
                className="flex-1 p-2 border rounded-md"
                placeholder={`Option ${option.id}`}
                required
                disabled={question.type === "truefalse"}
              />
              {question.type === "multiple" && question.options.length > 2 && (
                <Button 
                  type="button" 
                  onClick={() => removeOption(option.id)} 
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Question
        </Button>
      </div>
    </form>
  );
}
