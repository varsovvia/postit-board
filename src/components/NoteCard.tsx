'use client'

import { Note } from '@/lib/supabase'

interface NoteCardProps {
  note: Note
}

export default function NoteCard({ note }: NoteCardProps) {
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) {
      return 'No date'
    }
    
    try {
      // Parse the ISO date string
      const date = new Date(dateString)
      
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        console.warn('Invalid date string:', dateString)
        return 'Invalid date'
      }
      
      // Use Intl.DateTimeFormat for more reliable formatting
      const dateFormatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC' // Force UTC to avoid timezone issues
      })
      
      return dateFormatter.format(date)
    } catch (error) {
      console.error('Error formatting date:', error, 'Date string:', dateString)
      return 'Date error'
    }
  }

  return (
    <div className="group bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-white/20 hover:border-white/40 relative">
      {/* Subtle shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 opacity-0 group-hover:opacity-100"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="mb-6">
          <p className="text-white text-lg leading-relaxed font-medium group-hover:text-white/90 transition-colors duration-200">
            {note.content}
          </p>
        </div>
        
        {/* Email and Date in separate rows to ensure proper spacing */}
        <div className="space-y-3">
          {/* Email */}
          <div className="flex justify-start">
            <span className="font-semibold text-yellow-300 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 px-4 py-2 rounded-full backdrop-blur-sm border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-200 flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
              {note.user_email || 'Anonymous'}
            </span>
          </div>
          
          {/* Date - Always on its own line with full width */}
          <div className="flex justify-start">
            <span className="text-white/70 bg-gradient-to-r from-white/10 to-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-200 flex items-center min-w-0">
              <span className="mr-2 flex-shrink-0">🕒</span>
              <span className="truncate">{formatDate(note.created_at)}</span>
            </span>
          </div>
        </div>
      </div>
      
      {/* Subtle corner accent */}
      <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-teal-400/10 to-blue-500/10 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  )
}
