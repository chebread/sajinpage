import { createClient } from '@supabase/supabase-js';

const createClients = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  const client = createClient(supabaseUrl, supabaseKey);
  return client;
};

export default createClients;
