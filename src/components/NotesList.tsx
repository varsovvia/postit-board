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
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white/50"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-200 text-sm bg-red-500/20 p-6 rounded-3xl max-w-md mx-auto border border-red-400/30 backdrop-blur-sm">
          Error loading notes: {error}
        </div>
      </div>
    )
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-white/80 text-xl bg-white/10 p-8 rounded-3xl backdrop-blur-sm border border-white/20">
          ✨ No notes yet. Be the first to share something!
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white text-center drop-shadow-lg">📝 Recent Notes</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  )
}
