import { createClient } from '@supabase/supabase-js'

const supabaseURL = import.meta.env
const supaKey = import.meta.env

export const supabase = createClient(supabaseURL, supaKey)