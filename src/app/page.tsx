'use client'

import { useAuth } from '@/contexts/AuthContext'
import AuthForm from '@/components/AuthForm'
import CreateNote from '@/components/CreateNote'
import NotesList from '@/components/NotesList'
import Header from '@/components/Header'

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-white/20 to-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl backdrop-blur-sm border border-white/20">
            <span className="text-5xl">📝</span>
          </div>
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto"></div>
          <p className="text-white/80 mt-4 text-lg">Loading your experience...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <div className="relative z-10">
        <Header />

        <main className="max-w-6xl mx-auto px-4 py-8">
          {!user ? (
            <div className="text-center">
              <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-white/20 to-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl backdrop-blur-sm border border-white/20">
                  <span className="text-5xl">📝</span>
                </div>
                <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-lg animate-fade-in">
                  Welcome to Post-it Board
                </h1>
                <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Share your thoughts, ideas, and moments with the world. Join our community of creative minds! ✨
                </p>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <AuthForm />
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  Welcome back! 🎉
                </h1>
                <p className="text-xl text-white/90 text-shadow">
                  Start sharing your thoughts with the world
                </p>
              </div>

              <CreateNote />
              <NotesList />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
