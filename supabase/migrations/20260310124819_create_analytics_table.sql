/*
  # Create Analytics Table for AI Tools Hub

  1. New Tables
    - `tool_usage`
      - `id` (uuid, primary key) - Unique identifier for each usage record
      - `tool_name` (text) - Name of the AI tool used
      - `user_session` (text) - Anonymous session identifier
      - `created_at` (timestamptz) - Timestamp when the tool was used
      - `input_length` (integer) - Length of input text (optional)
      
  2. Security
    - Enable RLS on `tool_usage` table
    - Add policy for public insert access (anonymous analytics)
    - Add policy for public read access (for analytics display)

  3. Indexes
    - Add index on `tool_name` for faster querying
    - Add index on `created_at` for time-based queries
*/

CREATE TABLE IF NOT EXISTS tool_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_name text NOT NULL,
  user_session text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  input_length integer DEFAULT 0
);

ALTER TABLE tool_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can track tool usage"
  ON tool_usage
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view analytics"
  ON tool_usage
  FOR SELECT
  TO anon
  USING (true);

CREATE INDEX IF NOT EXISTS idx_tool_usage_tool_name ON tool_usage(tool_name);
CREATE INDEX IF NOT EXISTS idx_tool_usage_created_at ON tool_usage(created_at DESC);
