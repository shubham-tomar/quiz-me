"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type FormData = {
  title: string;
  description: string;
  content: string;
};

export function QuizForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    content: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Here we would make API call to save the quiz
      // For now just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      router.push("/quizzes");
    } catch (error) {
      console.error("Failed to create quiz:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium text-foreground">
          Quiz Title
        </label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="Enter quiz title"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium text-foreground">
          Description
        </label>
        <input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="Enter a short description"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium text-foreground">
          Content for Quiz Generation
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={8}
          className="w-full p-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="Paste your content (text, article, notes) here to generate quiz questions"
        />
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="button" 
          variant="outline" 
          className="mr-2"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Generate Quiz"}
        </Button>
      </div>
    </form>
  );
}
