'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const { signUp, signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      if (isSignUp) {
        const { error } = await signUp(email, password)
        if (error) {
          setError(error.message)
        } else {
          setMessage('Check your email for a confirmation link!')
        }
      } else {
        const { error } = await signIn(email, password)
        if (error) {
          setError(error.message)
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30 max-w-md w-full hover:border-white/40 transition-all duration-300 transform hover:scale-[1.02]">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-3xl">{isSignUp ? '✨' : '🔐'}</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
        <p className="text-white/80">{isSignUp ? 'Join our amazing community' : 'Sign in to continue your journey'}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white mb-3 flex items-center">
            <span className="mr-2">📧</span>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-white/25 focus:bg-white/25"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white mb-3 flex items-center">
            <span className="mr-2">🔒</span>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/70 backdrop-blur-sm transition-all duration-300 hover:bg-white/25 focus:bg-white/25"
            placeholder="Enter your password"
          />
        </div>

        {error && (
          <div className="text-red-200 text-sm bg-red-500/20 p-4 rounded-2xl border border-red-400/30 backdrop-blur-sm animate-pulse">
            <div className="flex items-center">
              <span className="mr-2">⚠️</span>
              {error}
            </div>
          </div>
        )}

        {message && (
          <div className="text-green-200 text-sm bg-green-500/20 p-4 rounded-2xl border border-green-400/30 backdrop-blur-sm animate-pulse">
            <div className="flex items-center">
              <span className="mr-2">✅</span>
              {message}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4 px-6 rounded-2xl hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:transform-none relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center justify-center">
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <span className="mr-2">{isSignUp ? '🚀' : '🔑'}</span>
                {isSignUp ? 'Create Account' : 'Sign In'}
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-white/80 hover:text-white transition-colors duration-300 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30"
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  )
}
