'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

export default function CreateNote() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  if (!user) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    setError(null)

    try {
              const { error } = await supabase
          .from('notes')
          .insert([
            {
              content: content.trim(),
              user_id: user.id,
              user_email: user.email,
            },
          ])

      if (error) {
        setError(error.message)
      } else {
        setContent('')
      }
    } catch (err) {
      setError('Failed to create note')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-[1.02]">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-teal-400 to-blue-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
          <span className="text-2xl">✨</span>
        </div>
        <h2 className="text-3xl font-bold text-white drop-shadow-lg">Create a New Note</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-white/90 mb-3 flex items-center">
            <span className="mr-2">💭</span>
            What&apos;s on your mind?
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            maxLength={500}
            rows={4}
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/70 resize-none backdrop-blur-sm transition-all duration-300 hover:bg-white/25 focus:bg-white/25"
            placeholder="Share your thoughts..."
          />
          <div className="text-right text-sm text-white/70 mt-2 flex items-center justify-end">
            <div className="w-24 bg-white/20 rounded-full h-2 mr-3">
              <div 
                className="bg-gradient-to-r from-teal-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(content.length / 500) * 100}%` }}
              ></div>
            </div>
            <span className="font-medium">{content.length}/500</span>
          </div>
        </div>

        {error && (
          <div className="text-red-200 text-sm bg-red-500/20 p-4 rounded-2xl border border-red-400/30 backdrop-blur-sm animate-pulse">
            <div className="flex items-center">
              <span className="mr-2">⚠️</span>
              {error}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="w-full bg-gradient-to-r from-teal-500 via-blue-500 to-purple-600 text-white py-4 px-6 rounded-2xl hover:from-teal-600 hover:via-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:transform-none relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center">
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Posting...
              </>
            ) : (
              <>
                <span className="mr-2">🚀</span>
                Post Note
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
      </form>
    </div>
  )
}
