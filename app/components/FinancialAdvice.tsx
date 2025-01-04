import React, { useEffect, useState } from 'react'
import { languageContent, StateType } from '../utils/languageContent'
import { speak, cancelSpeech } from '../utils/speechSynthesis'
import Chatbot from './Chatbot'

interface FinancialAdviceProps {
  state: StateType
}

const FinancialAdvice: React.FC<FinancialAdviceProps> = ({ state }) => {
  const { language, content } = languageContent[state]
  const [showChatbot, setShowChatbot] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    const speakAdvice = async () => {
      setIsSpeaking(true)
      try {
        await speak(content.dummyAdvice, language)
        await speak(content.chatbotPrompt, language)
        setShowChatbot(true)
      } catch (error) {
        console.error('Speech synthesis error:', error)
      } finally {
        setIsSpeaking(false)
      }
    }

    speakAdvice()

    return () => {
      cancelSpeech()
    }
  }, [state, content.dummyAdvice, content.chatbotPrompt, language])

  return (
    <div className="financial-advice bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-yellow-300 shadow-text">Your Personalized Financial Advice</h2>
      <p className="text-white text-lg leading-relaxed">{content.dummyAdvice}</p>
      {isSpeaking && <p className="mt-2 text-sm text-yellow-200">Speaking...</p>}
      {showChatbot && <Chatbot state={state} />}
    </div>
  )
}

export default FinancialAdvice

