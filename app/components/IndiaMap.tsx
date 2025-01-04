import React, { useState } from 'react'
import { languageContent, StateType } from '../utils/languageContent'
import { speak } from '../utils/speechSynthesis'

interface IndiaMapProps {
  onStateSelect: (state: StateType) => void
}

const IndiaMap: React.FC<IndiaMapProps> = ({ onStateSelect }) => {
  const [hoveredState, setHoveredState] = useState<StateType | null>(null)

  const handleStateHover = (state: StateType | null) => {
    setHoveredState(state)
  }

  const handleStateClick = (state: StateType) => {
    onStateSelect(state)
    playAudio(state)
  }

  const playAudio = (state: StateType) => {
    const { language, content } = languageContent[state]
    speak(content.stateName, language)
  }

  const renderState = (state: StateType, x: number, y: number, color: string) => {
    const isHovered = hoveredState === state
    return (
      <g key={state}>
        <circle
          cx={x}
          cy={y}
          r={isHovered ? 30 : 25}
          fill={color}
          stroke={isHovered ? 'white' : 'black'}
          strokeWidth={isHovered ? 3 : 2}
          onClick={() => handleStateClick(state)}
          onMouseEnter={() => handleStateHover(state)}
          onMouseLeave={() => handleStateHover(null)}
          className="cursor-pointer transition-all duration-200"
        />
        <text
          x={x}
          y={y + 40}
          textAnchor="middle"
          fill="white"
          fontSize={12}
          fontWeight="bold"
          className="pointer-events-none"
        >
          {languageContent[state].content.stateName}
        </text>
        <text
          x={x}
          y={y + 55}
          textAnchor="middle"
          fill="white"
          fontSize={10}
          className="pointer-events-none"
        >
          {state}
        </text>
        <circle
          cx={x + 35}
          cy={y - 35}
          r={10}
          fill="yellow"
          stroke="black"
          strokeWidth={1}
          onClick={(e) => {
            e.stopPropagation()
            playAudio(state)
          }}
          className="cursor-pointer hover:fill-amber-400 transition-colors"
        />
        <text
          x={x + 35}
          y={y - 31}
          textAnchor="middle"
          fill="black"
          fontSize={12}
          fontWeight="bold"
          className="pointer-events-none"
        >
          🔊
        </text>
      </g>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-gradient-to-b from-blue-500 to-blue-700 rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-bold text-center mb-4 text-white">Select Your State</h2>
      <svg viewBox="0 0 400 400" className="w-full h-auto">
        {renderState('Delhi', 200, 100, '#FF9933')}
        {renderState('West Bengal', 300, 200, '#138808')}
        {renderState('Tamil Nadu', 200, 300, '#000080')}
      </svg>
    </div>
  )
}

export default IndiaMap

