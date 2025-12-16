/*
  # AI Tool Aggregator Database Schema

  ## Overview
  This migration creates the database schema for the AI Tool Aggregator app,
  which recommends optimal combinations of AI tools based on user queries.

  ## New Tables
  
  ### 1. `queries`
  Stores user search queries and their results
  - `id` (uuid, primary key) - Unique identifier
  - `query_text` (text) - The user's search query
  - `category` (text, optional) - Filter category if applied
  - `session_id` (text) - Session identifier for tracking
  - `results` (jsonb) - Stored recommendations and scores
  - `created_at` (timestamptz) - Query timestamp
  
  ### 2. `feedback`
  Stores user feedback on recommendations
  - `id` (uuid, primary key) - Unique identifier
  - `query_id` (uuid, foreign key) - Reference to the query
  - `rating` (int) - User rating (1-5)
  - `comment` (text, optional) - User feedback text
  - `created_at` (timestamptz) - Feedback timestamp

  ## Security
  - Enable RLS on all tables
  - Public read/write access for demo mode (can be restricted later for auth)
  
  ## Indexes
  - Index on queries.session_id for fast history lookup
  - Index on queries.created_at for recent queries
  - Index on feedback.query_id for feedback lookup
*/

-- Create queries table
CREATE TABLE IF NOT EXISTS queries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query_text text NOT NULL,
  category text,
  session_id text NOT NULL,
  results jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query_id uuid REFERENCES queries(id) ON DELETE CASCADE,
  rating int CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_queries_session_id ON queries(session_id);
CREATE INDEX IF NOT EXISTS idx_queries_created_at ON queries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_query_id ON feedback(query_id);

-- Enable RLS
ALTER TABLE queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (demo mode)
CREATE POLICY "Anyone can insert queries"
  ON queries FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view queries"
  ON queries FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert feedback"
  ON feedback FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view feedback"
  ON feedback FOR SELECT
  TO anon
  USING (true);