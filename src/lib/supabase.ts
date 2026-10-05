import { createClient } from '@supabase/supabase-js';

// Public, RLS-scoped keys — safe to ship client-side.
// The `rsvps` table only allows anonymous INSERTs (see migration), never reads.
const SUPABASE_URL = 'https://txypujsttehtnqmasplc.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_0Zpstc6opVBXaxtsXp3L_Q_8X7hJDrB';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
