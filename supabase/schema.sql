-- Run this once in the Supabase project's SQL Editor (Database > SQL Editor > New query).

create table if not exists public.progress (
  user_id uuid references auth.users(id) not null,
  topic text not null,
  item_key text not null,
  level int not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, topic, item_key)
);

alter table public.progress enable row level security;

create policy "Users can manage their own progress"
  on public.progress
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
