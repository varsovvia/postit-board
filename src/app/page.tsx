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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

    return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {!user ? (
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-8 drop-shadow-lg">
              Welcome to Post-it Board
            </h1>
            <p className="text-xl text-white/90 mb-12 text-shadow">
              Sign in to start posting notes, or sign up to create an account
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
              <AuthForm />
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
                Welcome back!
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
  )
}
