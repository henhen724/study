# Handoff notes

Context for picking this work up on another machine (or in a fresh Claude
Code session). Covers two repos and some state that isn't in git at all.

## What this is

A login-gated study app (this repo), plus a parallel redesign effort on
Henry's personal site. Started as a single-purpose katakana/hiragana
reading trainer, generalized into a multi-topic platform.

## Repos and their state

- **This repo** (`study`) — [github.com/henhen724/study](https://github.com/henhen724/study),
  `main` branch, clean, pushed. Live at https://henhen724.github.io/study/.
  Plain HTML/CSS/JS, no build step. Auth + per-user progress via Supabase.
- **`henhen724.github.io`** (Franklin.jl personal site, separate repo,
  sibling directory) — `main` is untouched original template placeholder
  content. A `redesign` branch (pushed, not merged) has: a "Study" nav
  link to this app, a serif-heading/whitespace CSS pass in `_css/adjust.css`,
  and removal of unused Franklin template demo pages (menu1-3,
  template_example). `redesign`'s `about.md`/`index.md` were deliberately
  reverted to original placeholder text — see the standing rule below.

## Supabase setup (already done, cloud-side, nothing to redo)

- Project URL + publishable/anon key are already in
  [src/supabaseClient.js](src/supabaseClient.js) (safe to be public — access
  control is via the RLS policy below, not key secrecy).
- `supabase/schema.sql` has been run against the real project: creates the
  `progress` table with a Row Level Security policy scoping each user to
  their own rows.
- Email confirmation is turned OFF (Authentication → Providers → Email) —
  deliberate choice while this is single-user; Supabase's built-in mailer
  has a very low rate limit, which is why this was disabled rather than
  fought. Revisit if/when other users actually join (see Resend note below).
- A throwaway test account exists: `claude-debug-9f3ac1@gmail.com`. Fine to
  delete from Authentication → Users.
- A Resend API key was pasted into chat during a test send (worked,
  confirmed) but was never written to any file/commit. It's not wired into
  Supabase's SMTP settings yet — that's the real next step if/when
  multi-user support actually happens. Consider rotating that key since
  it's sitting in a chat transcript.

## Standing rule — important

**Never author prose/content for henhen724.github.io.** Henry writes all
homepage/about/bio text himself. Structural changes (CSS, nav wiring,
frontmatter/config fields, deleting unused files) are fine; inventing or
rewording any sentence that appears on the site is not. This is saved in
Claude's local memory on the desktop machine, which is why it's repeated
here explicitly — memory is scoped to that machine's project path and
won't automatically follow to a new machine/session.

## Design direction chosen, not yet implemented

Five homepage visual concepts were mocked up (Lorem Ipsum + placeholder
equations) and Henry picked **"Dark Research"** (dark navy, cyan/violet
accents, technical grid layout). A follow-up render used that style with
Henry's *actual* existing site text (the About bio, verbatim) to confirm it
reads well with real content.

**These mockups are local-only, not committed anywhere**: they live at
`Desktop/site-mockups/` on the desktop machine (5 concept files +
`live-home.html`/`live-about.html`/`live-dark-research.css` using the real
text). If you want them on another machine, they need to be copied or
committed somewhere — ask for that explicitly if wanted.

The chosen design has not yet been applied to the actual Franklin site.

## Open questions for Henry

- The About-page bio ("still doing my rotations... starting in Ben Lev's
  lab") reads like it predates settling into a lab. Still accurate, or
  needs updating? (Henry writes the actual replacement text himself.)
- Merge `redesign` into `main` now, or hold for more changes first?
- Keep the site on Franklin.jl, or move to something simpler? Henry said
  he's "not that attached to Franklin" — nothing decided yet.

## Minor known issue, not fixed

The in-quiz progress bar uses `transition: width 0.3s ease`. If the browser
tab is backgrounded mid-update, the transition can freeze visually (Chrome
pauses animation timelines for hidden tabs). Low priority, real users
aren't likely to background the tab mid-answer.

## Dev notes

- No build step for either the study app or (once deployed) the mockups —
  just static files. A local static server (e.g. `python -m http.server`)
  is enough to preview either.
- `.claude/launch.json` dev-preview configs were added under the `HSP`
  project directory on the desktop machine, hardcoding that machine's
  Python path — not portable, trivial to recreate wherever needed.
