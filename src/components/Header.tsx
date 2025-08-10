'use client'

import { useAuth } from '@/contexts/AuthContext'

export default function Header() {
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">📝 Post-it Board</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-white/90">
                  Signed in as <span className="font-medium text-yellow-300">{user.email}</span>
                </span>
                <button
                  onClick={handleSignOut}
                  className="bg-white/20 text-white px-4 py-2 rounded-full text-sm hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 transition-all duration-200 backdrop-blur-sm border border-white/30"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <span className="text-sm text-white/90">
                Please sign in to post notes
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
