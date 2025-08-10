'use client'

import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="bg-gradient-to-r from-white/15 via-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl mx-4 mt-4 mb-8 p-6 border border-white/20 hover:border-white/30 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 group">
          <div className="w-14 h-14 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300">
            <span className="text-3xl">📝</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300">
              Post-it Board
            </h1>
            <p className="text-white/70 text-sm group-hover:text-white/80 transition-colors duration-300">
              ✨ Share your thoughts with the world ✨
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-white/90 bg-gradient-to-r from-white/15 to-white/5 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
                {user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="bg-gradient-to-r from-red-500/20 to-pink-500/20 text-white px-6 py-3 rounded-full hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300 backdrop-blur-sm border border-red-400/30 hover:border-red-400/50 hover:shadow-lg transform hover:scale-105 flex items-center"
              >
                <span className="mr-2">🚪</span>
                Sign Out
              </button>
            </>
          ) : (
            <span className="text-sm text-white/90 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
              Please sign in to post notes
            </span>
          )}
        </div>
      </div>
    </header>
  )
}
