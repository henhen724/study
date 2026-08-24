# Study

A login-gated collection of study apps. First topic: reading English
loanwords written in katakana and hiragana (see
[topics/kana](topics/kana)). Built to grow — add a new folder under
`topics/`, and register it in [src/dashboard.js](src/dashboard.js).

## Stack

Plain HTML/CSS/JS, no build step, no framework. Auth and per-user progress
storage are handled by [Supabase](https://supabase.com) (Postgres + Auth),
called directly from the browser via `@supabase/supabase-js` (loaded from
esm.sh, no bundler needed).

## One-time Supabase setup

1. Create a free project at supabase.com.
2. In the SQL Editor, run [supabase/schema.sql](supabase/schema.sql) — this
   creates the `progress` table and the Row Level Security policy that
   restricts each user to their own rows.
3. Settings → API → copy the Project URL and the publishable (anon) key into
   [src/supabaseClient.js](src/supabaseClient.js). That key is meant to be
   public (access control comes from the RLS policy, not secrecy) — never put
   the `service_role` secret key here.
4. By default Supabase requires email confirmation on sign-up. For a
   single-user personal deployment you can turn that off under
   Authentication → Providers → Email → "Confirm email", or just click the
   confirmation link Supabase emails you once.

## Running it locally

```
python -m http.server 5174
```

then open http://localhost:5174/.

## Adding a topic

1. Add `topics/<id>/` with its own `index.html`, `style.css`, `src/data.js`,
   `src/app.js` (see [topics/kana](topics/kana) as a template).
2. Import `getSession`/`signOut` from `../../../src/auth.js` and
   `loadProgress`/`saveProgress`/`resetProgress` from
   `../../../src/progress.js`, using a unique topic id string.
3. Add an entry to the `TOPICS` array in
   [src/dashboard.js](src/dashboard.js).
