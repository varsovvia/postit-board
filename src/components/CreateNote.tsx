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
    <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">✨ Create a New Note</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-white/90 mb-3">
            What's on your mind?
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            maxLength={500}
            rows={4}
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/70 resize-none backdrop-blur-sm transition-all duration-200"
            placeholder="Share your thoughts..."
          />
          <div className="text-right text-sm text-white/70 mt-2">
            {content.length}/500 characters
          </div>
        </div>

        {error && (
          <div className="text-red-200 text-sm bg-red-500/20 p-4 rounded-2xl border border-red-400/30 backdrop-blur-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 px-6 rounded-2xl hover:from-teal-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none"
        >
          {loading ? 'Posting...' : '🚀 Post Note'}
        </button>
      </form>
    </div>
  )
}
