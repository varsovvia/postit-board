'use client'

import { Note } from '@/lib/supabase'

interface NoteCardProps {
  note: Note
}

export default function NoteCard({ note }: NoteCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/20 hover:border-white/40">
      <div className="mb-6">
        <p className="text-white text-lg leading-relaxed font-medium">{note.content}</p>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-yellow-300 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
          {note.user_email || 'Anonymous'}
        </span>
        <span className="text-white/70 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
          {formatDate(note.created_at)}
        </span>
      </div>
    </div>
  )
}
