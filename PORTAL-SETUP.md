# Portal — setup

The `/portal` routes run on Supabase (auth + Postgres + Storage) and serve two audiences:

- **Internal** — the Oxydise team. Sees everything.
- **Clients** — every invited external user sees the same shared pool of client files. No per-client isolation.

Five one-time steps to bring it online.

## 1. Create the Supabase project
- https://supabase.com → New Project
- Region near your users
- Save the project ref (used in the URL) + the database password

## 2. Run the schema
Open the Supabase SQL editor and paste each migration in order, executing between each:

1. `supabase/migrations/0001_portal.sql` — creates `client`, `client_member`, `file`, enables RLS, wires the policies.
2. `supabase/migrations/0002_categories_internal.sql` — adds `file.category` (`logo | pdf | font | brochure | photo | video | social_template | other`), the `client.is_internal` flag, and seeds the **Oxydise Internal** client row.
3. `supabase/migrations/0003_shared_clients_pool.sql` — seeds the shared **Clients** pool row. Every external invite joins this row, so all clients see the same client files.

## 3. Create the storage bucket
Supabase → Storage → **New bucket**
- Name: `client-files`
- Public: **off** (private)
- Keep the default file size limits, or raise if you need bigger files.

## 4. Environment variables
Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<Project Settings → API → anon public>
SUPABASE_SERVICE_ROLE_KEY=<Project Settings → API → service_role>  # server-only
NEXT_PUBLIC_SITE_URL=https://oxydise-brand.com
```

Add the same variables to Vercel (Project → Settings → Environment Variables). Mark `SUPABASE_SERVICE_ROLE_KEY` as encrypted.

## 5. Create your first admin
Supabase doesn't know which user is the admin on day one. Create it manually:

1. In Supabase → Auth → Users, click **Invite user** and enter your email. Check your inbox, click the magic link (this creates your `auth.users` row).
2. The **Oxydise Internal** client row was seeded by migration `0002`. Find its `id` in Supabase → Table editor → `client` (look for `slug = 'oxydise-internal'`).
3. In Supabase → Table editor → `client_member`, insert a row:
   - `user_id` = your user's `id` from `auth.users`
   - `client_id` = the Oxydise Internal row's `id`
   - `role` = `admin`
4. Go to `https://oxydise-brand.com/portal`. You're now an admin; open `/portal/admin` to invite team members (Oxydise team) or clients (external). The admin UI picks the right bucket for you — no need to touch `client` / `client_member` tables again.

## How it works

- **Login**: `/portal/login` — magic-link sign-in. Supabase sends the email; Next.js exchanges the code at `/portal/auth/callback` for a session.
- **Middleware**: `middleware.js` refreshes the session on every `/portal/*` request and redirects unauthenticated hits to `/portal/login`.
- **Client view** (`/portal`): sidebar navigation with section toggle (Internal / Client files) and category filters. Image and video files show thumbnail previews via 1-hour signed URLs; other types get a typed glyph. RLS does the visibility filtering.
- **Admin view** (`/portal/admin`): three tabs.
  - **Upload**: drag-and-drop (multi-file), audience toggle (Client files / Internal), category chips.
  - **Invite**: email + role (External client / Oxydise team). Sends a magic-link invite and joins them to the right pool.
  - **All files**: every file grouped by audience → category, with delete.
- **Downloads** (`/api/portal/download/[fileId]`): server checks permission via RLS, generates a 60-second signed URL, redirects to it.
- **Categories**: ordered + labelled in `lib/portal/groupFiles.js`. To add a new category, update the SQL `check` constraint in a new migration and append it to `CATEGORIES` in that file.

## Costs
Supabase free tier covers ~1 GB storage, 50 k monthly active auth users, 5 GB egress/mo. Enough for v1 — a typical brand kit (logos, PDFs, fonts, social templates, a few short videos) lands at 200–500 MB. Upgrade to Pro (~$25/mo, 100 GB storage + 250 GB egress) once you start hosting raw video masters.
