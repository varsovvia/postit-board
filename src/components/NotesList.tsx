'use client'

import { useEffect, useState } from 'react'
import { supabase, Note } from '@/lib/supabase'
import NoteCard from './NoteCard'

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchNotes()

    // Set up real-time subscription
    const channel = supabase
      .channel('notes_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notes',
        },
        () => {
          fetchNotes()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        setError(error.message)
      } else {
        setNotes(data || [])
      }
    } catch (err) {
      setError('Failed to fetch notes')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center px-6 py-4 font-semibold leading-6 text-white shadow-lg rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-4"></div>
          <span className="text-lg">Loading your notes...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-200 text-sm bg-red-500/20 p-6 rounded-3xl max-w-md mx-auto border border-red-400/30 backdrop-blur-sm animate-pulse">
          <div className="flex items-center justify-center">
            <span className="mr-2">⚠️</span>
            Error loading notes: {error}
          </div>
        </div>
      </div>
    )
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-white/80 text-xl bg-gradient-to-br from-white/15 to-white/5 p-8 rounded-3xl backdrop-blur-sm border border-white/20 hover:border-white/30 transition-all duration-300">
          <div className="w-20 h-20 bg-gradient-to-r from-teal-400/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">✨</span>
          </div>
          <p className="mb-2">No notes yet.</p>
          <p className="text-lg">Be the first to share something amazing! 🚀</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white inline-block">📝 Recent Notes</h2>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  )
}
