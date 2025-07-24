"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How does Quiz-Me generate questions?",
    answer: "Quiz-Me uses advanced AI technology to analyze your content and generate relevant questions. The AI identifies key concepts, facts, and relationships in your content to create various question types including multiple choice, true/false, and fill-in-the-blank."
  },
  {
    question: "Can I edit the AI-generated questions?",
    answer: "Yes! While our AI creates high-quality questions automatically, you have full control to edit, delete, or add your own questions. Our question editor makes it easy to modify any aspect of generated questions."
  },
  {
    question: "What types of content can I use to generate quizzes?",
    answer: "Quiz-Me works with a variety of content types. You can paste text directly, upload documents (PDF, DOCX, TXT), or even provide a URL to a webpage. The more structured and informative your content is, the better questions our AI will generate."
  },
  {
    question: "How many quizzes can I create with a free account?",
    answer: "Free accounts can create up to 5 quizzes with a maximum of 15 questions each. For unlimited quizzes and questions, consider upgrading to our Pro plan."
  },
  {
    question: "Can I share my quizzes with others?",
    answer: "Absolutely! All plans allow you to share quizzes via unique links. Pro and Team plans offer additional sharing options including embedding, password protection, and direct email invitations."
  },
  {
    question: "How do I track results and performance?",
    answer: "Quiz-Me provides analytics for all your quizzes. You can see completion rates, average scores, commonly missed questions, and individual performance. Pro and Team plans include more detailed analytics and export options."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50" id="faq">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about Quiz-Me
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border rounded-lg bg-white overflow-hidden"
              >
                <button
                  className="flex justify-between items-center w-full p-6 text-left"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="font-medium text-lg">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Still have questions? We're here to help.
            </p>
            <a 
              href="mailto:support@quizme.example.com" 
              className="text-primary font-medium hover:underline"
            >
              Contact our support team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
