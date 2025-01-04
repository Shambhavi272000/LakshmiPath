import React, { useEffect, useState } from 'react'
import { languageContent, StateType } from '../utils/languageContent'
import { speak, cancelSpeech } from '../utils/speechSynthesis'

interface AvatarProps {
  state: StateType
}

const Avatar: React.FC<AvatarProps> = ({ state }) => {
  const { language, content } = languageContent[state]
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    const speakWelcome = async () => {
      setIsSpeaking(true)
      try {
        await speak(content.welcome, language)
        await speak(content.fillDetails, language)
      } catch (error) {
        console.error('Speech synthesis error:', error)
      } finally {
        setIsSpeaking(false)
      }
    }

    speakWelcome()

    return () => {
      cancelSpeech()
    }
  }, [state, language, content.welcome, content.fillDetails])

  const getAvatarImage = (state: StateType) => {
    return `/placeholder.svg?height=200&width=200&text=${state}+Avatar`
  }

  return (
    <div className="avatar flex flex-col items-center mb-8">
      <img
        src={getAvatarImage(state)}
        alt={`Avatar for ${state}`}
        className="w-48 h-48 rounded-full border-4 border-yellow-300 shadow-lg"
      />
      <p className="mt-4 text-xl font-semibold text-yellow-300 shadow-text">AI Avatar for {state}</p>
      <p className="mt-2 text-lg text-yellow-300 shadow-text">{content.fillDetails}</p>
      {isSpeaking && <p className="mt-2 text-sm text-yellow-200">Speaking...</p>}
    </div>
  )
}

export default Avatar

