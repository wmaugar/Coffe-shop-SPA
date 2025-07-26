import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://zqtjrwtviohfttmmrukn.supabase.co";
//const supabaseKey = process.env.SUPABASE_KEY;
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxdGpyd3R2aW9oZnR0bW1ydWtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1MjUzNDMsImV4cCI6MjA2MTEwMTM0M30.3aATEcdW4OgVcvkvOGgJOaSBVSgVHeZbcUvoDKxS8lk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
