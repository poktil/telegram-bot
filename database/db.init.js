const { createClient } = require('@supabase/supabase-js')

const SUPABASE = createClient(
  'https://jbvwekgvjevspiwnirnn.supabase.co',
  process.env.SUPABASE_SECRET_KEY,
)

module.exports = { SUPABASE }
