# Portal — setup

The `/portal` routes run on Supabase (auth + Postgres + Storage) and serve two audiences:

- **Internal** — the Oxydise team, linked to a special `client` row flagged `is_internal = true`.
- **Clients** — external clients, each with their own `client` row. Members only ever see their own files.

Five one-time steps to bring it online.

## 1. Create the Supabase project
- https://supabase.com → New Project
- Region near your users
- Save the project ref (used in the URL) + the database password

## 2. Run the schema
Open the Supabase SQL editor and paste each migration in order, executing between each:

1. `supabase/migrations/0001_portal.sql` — creates `client`, `client_member`, `file`, enables RLS, wires the policies.
2. `supabase/migrations/0002_categories_internal.sql` — adds `file.category` (`logo | pdf | font | brochure | photo | video | social_template | other`), the `client.is_internal` flag, and seeds the **Oxydise Internal** client row used by the internal-team section of the portal.

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
4. Go to `https://oxydise-brand.com/portal`. You're now an admin; open `/portal/admin` to create client orgs and invite their users. Any further Oxydise team members go into the Oxydise Internal client (role can be `admin` or `client` — both see internal files).

## How it works

- **Login**: `/portal/login` — magic-link sign-in. Supabase sends the email; Next.js exchanges the code at `/portal/auth/callback` for a session.
- **Middleware**: `middleware.js` refreshes the session on every `/portal/*` request and redirects unauthenticated hits to `/portal/login`.
- **Client view** (`/portal`): lists files the user's `client_member` row gives access to, split into **Internal** (files from clients flagged `is_internal`) and **Brand assets** (everything else), then grouped by category. RLS does the filtering.
- **Admin view** (`/portal/admin`): create clients, invite members, upload files (with category), delete files. Files grouped by client → category. Internal clients carry an "Internal" badge. Server Actions in `app/portal/admin/_actions.js` do the work via the service-role client.
- **Downloads** (`/api/portal/download/[fileId]`): server checks permission via RLS, generates a 60-second signed URL, and redirects to it.
- **Categories**: ordered + labelled in `lib/portal/groupFiles.js`. To add a new category, update the SQL `check` constraint in a new migration and append it to `CATEGORIES` in that file.

## Costs
Supabase free tier covers ~1 GB storage, 50 k monthly active auth users, 5 GB egress/mo. Enough for v1 — a typical brand kit (logos, PDFs, fonts, social templates, a few short videos) lands at 200–500 MB. Upgrade to Pro (~$25/mo, 100 GB storage + 250 GB egress) once you start hosting raw video masters.
