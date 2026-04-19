# Client portal — setup

The `/portal` routes run on Supabase (auth + Postgres + Storage). Five one-time steps to bring it online.

## 1. Create the Supabase project
- https://supabase.com → New Project
- Region near your users
- Save the project ref (used in the URL) + the database password

## 2. Run the schema
Open the Supabase SQL editor and paste `supabase/migrations/0001_portal.sql`. Execute. This creates the `client`, `client_member`, and `file` tables, enables RLS, and wires the policies.

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
NEXT_PUBLIC_SITE_URL=https://brand.oxydise.co.uk
```

Add the same variables to Vercel (Project → Settings → Environment Variables). Mark `SUPABASE_SERVICE_ROLE_KEY` as encrypted.

## 5. Create your first admin
Supabase doesn't know which user is the admin on day one. Create it manually:

1. In Supabase → Auth → Users, click **Invite user** and enter your email. Check your inbox, click the magic link (this creates your `auth.users` row).
2. In Supabase → Table editor → `client`, insert a row: `name = 'Oxydise'`, `slug = 'oxydise'`.
3. In Supabase → Table editor → `client_member`, insert a row:
   - `user_id` = your user's `id` from `auth.users`
   - `client_id` = the Oxydise row's `id`
   - `role` = `admin`
4. Go to `https://brand.oxydise.co.uk/portal`. You're now an admin; open `/portal/admin` to create real clients and invite their users.

## How it works

- **Login**: `/portal/login` — magic-link sign-in. Supabase sends the email; Next.js exchanges the code at `/portal/auth/callback` for a session.
- **Middleware**: `middleware.js` refreshes the session on every `/portal/*` request and redirects unauthenticated hits to `/portal/login`.
- **Client view** (`/portal`): lists files the user's `client_member` row gives access to. RLS does the filtering.
- **Admin view** (`/portal/admin`): create clients, invite members, upload files, delete files. Server Actions in `app/portal/admin/_actions.js` do the work via the service-role client.
- **Downloads** (`/api/portal/download/[fileId]`): server checks permission via RLS, generates a 60-second signed URL, and redirects to it.

## Costs
Supabase free tier covers ~500 MB storage, 50 k monthly active auth users, 1 GB egress. Enough for v1.
