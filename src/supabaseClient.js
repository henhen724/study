import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// The anon/public key is safe to expose client-side by design — Supabase
// enforces access control via Row Level Security policies (see
// supabase/schema.sql), not by keeping this key secret. Never put the
// service_role key here.
const SUPABASE_URL = "https://qawwwdzyiryvrvxtevax.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Zo10bxXgARl-KF3daGoM8A_Sk1MSgOE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
