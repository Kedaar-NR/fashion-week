
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://uvtwkzjxcatcjozoyesx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2dHdremp4Y2F0Y2pvem95ZXN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4MDI0NzcsImV4cCI6MjAyNjM3ODQ3N30.n4910l712vNPQOuMXwoL2vJh0tbWYXIFWEp6KM0gMCA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
