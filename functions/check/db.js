const { createClient } = require("@supabase/supabase-js");

const { DB_SUPABASE_URL, DB_SUPABASE_KEY } = process.env;

const supabase = createClient(DB_SUPABASE_URL, DB_SUPABASE_KEY);

module.exports = supabase;
