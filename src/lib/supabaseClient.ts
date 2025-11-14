import { createClient } from '@supabase/supabase-js'

const supabaseURL = import.meta.env.PUBLIC_SUPA_URL
const supaKey = import.meta.env.PUBLIC_SUPA_KEY

export const supabase = createClient(supabaseURL, supaKey)