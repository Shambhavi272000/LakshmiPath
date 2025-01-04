import React, { useState } from 'react'
import { languageContent, StateType } from '../utils/languageContent'

interface UserFormProps {
  onSubmit: (info: any) => void
  state: StateType
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, state }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    category: '',
    isTribal: false,
    monthlyIncome: '',
    hasBankAccount: false,
    bankName: '',
  })

  const { language, content } = languageContent[state]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...formData, state })
  }

  const speakPrompt = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text)
    speech.lang = language
    window.speechSynthesis.speak(speech)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-yellow-300 shadow-text">
          {content.name}
          <button type="button" onClick={() => speakPrompt(content.name)} className="ml-2 text-xs bg-yellow-500 text-white px-2 py-1 rounded">🔊</button>
        </label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 text-gray-800" />
      </div>
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-yellow-300 shadow-text">
          {content.age}
          <button type="button" onClick={() => speakPrompt(content.age)} className="ml-2 text-xs bg-yellow-500 text-white px-2 py-1 rounded">🔊</button>
        </label>
        <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 text-gray-800" />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-yellow-300 shadow-text">
          {content.category}
          <button type="button" onClick={() => speakPrompt(content.category)} className="ml-2 text-xs bg-yellow-500 text-white px-2 py-1 rounded">🔊</button>
        </label>
        <select id="category" name="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 text-gray-800">
          <option value="">{content.categoryOptions.select}</option>
          <option value="General">{content.categoryOptions.general}</option>
          <option value="OBC">{content.categoryOptions.obc}</option>
          <option value="SC">{content.categoryOptions.sc}</option>
          <option value="ST">{content.categoryOptions.st}</option>
        </select>
      </div>
      <div>
        <label className="flex items-center">
          <input type="checkbox" name="isTribal" checked={formData.isTribal} onChange={handleChange} className="rounded border-gray-300 text-yellow-500 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50" />
          <span className="ml-2 text-sm text-yellow-300 shadow-text">{content.isTribal}</span>
          <button type="button" onClick={() => speakPrompt(content.isTribal)} className="ml-2 text-xs bg-yellow-500 text-white px-2 py-1 rounded">🔊</button>
        </label>
      </div>
      <div>
        <label htmlFor="monthlyIncome" className="block text-sm font-medium text-yellow-300 shadow-text">
          {content.monthlyIncome}
          <button type="button" onClick={() => speakPrompt(content.monthlyIncome)} className="ml-2 text-xs bg-yellow-500 text-white px-2 py-1 rounded">🔊</button>
        </label>
        <input type="number" id="monthlyIncome" name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 text-gray-800" />
      </div>
      <div>
        <label className="flex items-center">
          <input type="checkbox" name="hasBankAccount" checked={formData.hasBankAccount} onChange={handleChange} className="rounded border-gray-300 text-yellow-500 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50" />
          <span className="ml-2 text-sm text-yellow-300 shadow-text">{content.hasBankAccount}</span>
          <button type="button" onClick={() => speakPrompt(content.hasBankAccount)} className="ml-2 text-xs bg-yellow-500 text-white px-2 py-1 rounded">🔊</button>
        </label>
      </div>
      {formData.hasBankAccount && (
        <div>
          <label htmlFor="bankName" className="block text-sm font-medium text-yellow-300 shadow-text">
            {content.bankName}
            <button type="button" onClick={() => speakPrompt(content.bankName)} className="ml-2 text-xs bg-yellow-500 text-white px-2 py-1 rounded">🔊</button>
          </label>
          <input type="text" id="bankName" name="bankName" value={formData.bankName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50 text-gray-800" />
        </div>
      )}
      <button type="submit" className="w-full px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition-colors">{content.submit}</button>
    </form>
  )
}

export default UserForm

