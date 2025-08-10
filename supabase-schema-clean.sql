-- Drop existing table and policies if they exist
DROP TABLE IF EXISTS public.notes CASCADE;

-- Create the notes table
CREATE TABLE public.notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    user_email TEXT NOT NULL,
    content TEXT NOT NULL CHECK (char_length(content) > 0 AND char_length(content) <= 500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to insert notes
CREATE POLICY "Users can insert their own notes" ON public.notes
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy to allow all users to view all notes
CREATE POLICY "Anyone can view notes" ON public.notes
    FOR SELECT USING (true);

-- Create policy to allow users to update their own notes
CREATE POLICY "Users can update their own notes" ON public.notes
    FOR UPDATE USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own notes
CREATE POLICY "Users can delete their own notes" ON public.notes
    FOR DELETE USING (auth.uid() = user_id);

-- Create index for better performance on user_id
CREATE INDEX idx_notes_user_id ON public.notes(user_id);

-- Create index for better performance on created_at (for ordering)
CREATE INDEX idx_notes_created_at ON public.notes(created_at DESC);

-- Enable real-time subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE public.notes;
