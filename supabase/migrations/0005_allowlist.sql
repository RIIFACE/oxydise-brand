-- 0005_allowlist.sql
--
-- Login allowlist + access-request log.
--
-- /portal/login first runs through a server-side gate:
--   1. Email matches an Oxydise domain (@oxydise.co.uk /
--      @oxydisewellness.co.uk) → magic link sent.
--   2. Email is in `allowed_email` → magic link sent.
--   3. Anything else → row written to `access_request` so an admin
--      can see who's knocking, and the user gets a polite "request
--      received" screen. No magic link, no Supabase email rate limit
--      consumed.

create table if not exists allowed_email (
  email text primary key,
  added_by uuid references auth.users(id),
  added_at timestamptz default now(),
  note text
);

create table if not exists access_request (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  requested_at timestamptz default now(),
  status text check (status in ('pending', 'approved', 'rejected')) default 'pending'
);

create index if not exists access_request_email_idx on access_request(email);
create index if not exists access_request_status_idx on access_request(status);

-- RLS — admins read/write, nobody else touches these tables directly.
-- Server actions use the service-role client so they bypass RLS anyway,
-- but the policies make sure no other path reads them.
alter table allowed_email enable row level security;
alter table access_request enable row level security;

drop policy if exists "admins manage allowed_email" on allowed_email;
create policy "admins manage allowed_email" on allowed_email
  for all using (is_admin()) with check (is_admin());

drop policy if exists "admins read access_request" on access_request;
create policy "admins read access_request" on access_request
  for all using (is_admin()) with check (is_admin());

-- Add a 'manager' role tier between 'client' and 'admin'.
-- Managers can: invite/allow emails, grant Client/Internal access,
--               approve access requests, revoke non-admin members.
-- Managers cannot: promote to admin, demote admins, delete users —
--                  those stay admin-only.
alter table client_member drop constraint if exists client_member_role_check;
alter table client_member add constraint client_member_role_check
  check (role in ('client', 'manager', 'admin'));

create or replace function is_manager_or_admin() returns boolean
language sql stable security definer as $$
  select exists (
    select 1 from client_member
    where user_id = auth.uid() and role in ('manager', 'admin')
  );
$$;
