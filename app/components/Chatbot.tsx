import React, { useState, useEffect } from 'react'
import { languageContent, StateType } from '../utils/languageContent'
import { speak, cancelSpeech } from '../utils/speechSynthesis'

interface ChatbotProps {
  state: StateType
}

const Chatbot: React.FC<ChatbotProps> = ({ state }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [input, setInput] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const { language, content } = languageContent[state]

  useEffect(() => {
    if (isOpen) {
      speakMessage(content.chatbotWelcome)
    }
    return () => {
      cancelSpeech()
    }
  }, [isOpen, content.chatbotWelcome, language])

  const speakMessage = async (text: string) => {
    setIsSpeaking(true)
    try {
      await speak(text, language)
    } catch (error) {
      console.error('Speech synthesis error:', error)
    } finally {
      setIsSpeaking(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      const userMessage = { text: input, isUser: true }
      setMessages(prev => [...prev, userMessage])
    
      // Response logic
      let botResponse
      if (
        input.toLowerCase().includes('jan dhan yojana') ||
        input.toLowerCase().includes('जन धन योजना') ||
        input.toLowerCase() === 'प्रधान मंत्री जन धन योजना क्या है?' ||
        input.toLowerCase() === 'pradhan mantri jan dhan yojana kya hai?'
      ) {
        botResponse = { text: content.janDhanYojanaInfo, isUser: false }
      } else {
        botResponse = { text: content.chatbotDefaultResponse, isUser: false }
      }
    
      setTimeout(() => {
        setMessages(prev => [...prev, botResponse])
        speakMessage(botResponse.text)
      }, 1000)
    
      setInput('')
    }
  }

  return (
    <div className="fixed bottom-4 right-4">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
        >
          {content.chatbotButton}
        </button>
      )}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="bg-yellow-500 text-white p-4 rounded-t-lg">
            <h3 className="font-bold">{content.chatbotTitle}</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${
                  message.isUser ? 'text-right' : 'text-left'
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    message.isUser
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))}
            {isSpeaking && (
              <div className="text-center text-sm text-yellow-500">Speaking...</div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={content.chatbotInputPlaceholder}
                className="flex-1 p-2 border rounded-lg"
              />
              <button
                type="submit"
                className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                {content.chatbotSendButton}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Chatbot

