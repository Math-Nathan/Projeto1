<<<<<<< HEAD
const mysql = require('mysql2/promise');
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)
=======
const { createClient } = require('@supabase/supabase-js');
>>>>>>> 835a1d7a2a508d4099b5e9e96d8028b306153f3b

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase credentials are missing. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY).');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
