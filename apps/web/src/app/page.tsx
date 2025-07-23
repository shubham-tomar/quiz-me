'use client'

import { useState } from 'react'
import { QuizGenerator } from '@quizme/shared'

export default function Home() {
  const [quizTitle, setQuizTitle] = useState('')
  const [content, setContent] = useState('')
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(false)

  const handleGenerateQuiz = async () => {
    if (!content.trim()) return
    
    setLoading(true)
    try {
      const result = await QuizGenerator.generateQuiz(content)
      if (result.success) {
        setQuestions(result.questions)
      }
    } catch (error) {
      console.error('Error generating quiz:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">QuizMe - Web</h1>
      
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Quiz Title</label>
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Enter quiz title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg h-32"
            placeholder="Enter content to generate quiz from..."
          />
        </div>

        <button
          onClick={handleGenerateQuiz}
          disabled={loading || !content.trim()}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Generate Quiz'}
        </button>

        {questions.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Generated Questions</h2>
            <div className="space-y-4">
              {questions.map((question: any, index: number) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold mb-2">Question {index + 1}</h3>
                  <p className="mb-3">{question.question}</p>
                  <div className="space-y-1">
                    {question.options.map((option: string, optIndex: number) => (
                      <div
                        key={optIndex}
                        className={`p-2 rounded ${
                          optIndex === question.correctAnswer
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-50'
                        }`}
                      >
                        {String.fromCharCode(65 + optIndex)}. {option}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}