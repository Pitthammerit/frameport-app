import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types'

// Create a single supabase client for interacting with your database
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Export the client for use in components
export default supabase