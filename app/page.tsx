'use client'

import { useState } from 'react'
import IndiaMap from './components/IndiaMap'
import Avatar from './components/Avatar'
import UserForm from './components/UserForm'
import FinancialAdvice from './components/FinancialAdvice'
import { StateType } from './utils/languageContent'

export default function Home() {
  const [selectedState, setSelectedState] = useState<StateType | null>(null)
  const [userInfo, setUserInfo] = useState<any>(null)

  const handleStateSelect = (state: StateType) => {
    setSelectedState(state)
  }

  const handleUserInfoSubmit = async (info: any) => {
    setUserInfo(info)
    // In a real application, you would send this info to your backend
    // and receive personalized advice. For now, we'll just set userInfo
    // to trigger the display of the FinancialAdvice component.
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-400 via-pink-500 to-red-500 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-yellow-300 shadow-text">Lakshmi Path: Financial Advice for Rural Women</h1>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-8 shadow-lg">
          {!selectedState && (
            <div className="mb-8">
              <IndiaMap onStateSelect={handleStateSelect} />
            </div>
          )}
          {selectedState && !userInfo && (
            <div className="flex flex-col items-center">
              <Avatar state={selectedState} />
              <UserForm onSubmit={handleUserInfoSubmit} state={selectedState} />
            </div>
          )}
          {userInfo && selectedState && (
            <FinancialAdvice state={selectedState} />
          )}
        </div>
      </div>
    </main>
  )
}

