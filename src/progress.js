import { supabase } from "./supabaseClient.js";

// Progress is stored per (user, topic, item_key) so any future topic can
// reuse the same table without a schema change — see supabase/schema.sql.

export async function loadProgress(topic) {
  const { data, error } = await supabase
    .from("progress")
    .select("item_key, level")
    .eq("topic", topic);
  if (error) throw error;
  const levels = {};
  for (const row of data) levels[row.item_key] = row.level;
  return levels;
}

export async function saveProgress(topic, userId, levelByItemKey) {
  const rows = Object.entries(levelByItemKey).map(([item_key, level]) => ({
    user_id: userId,
    topic,
    item_key,
    level,
    updated_at: new Date().toISOString(),
  }));
  if (rows.length === 0) return;
  const { error } = await supabase
    .from("progress")
    .upsert(rows, { onConflict: "user_id,topic,item_key" });
  if (error) throw error;
}

export async function resetProgress(topic, userId) {
  const { error } = await supabase
    .from("progress")
    .delete()
    .eq("user_id", userId)
    .eq("topic", topic);
  if (error) throw error;
}
