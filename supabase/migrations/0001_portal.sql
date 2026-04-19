-- Oxydise client portal schema
-- Paste into Supabase SQL editor for your project.

create extension if not exists "pgcrypto";

-- Client orgs (managed by admin)
create table if not exists client (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_at timestamptz default now()
);

-- Links auth.users to a client org
create table if not exists client_member (
  user_id uuid references auth.users(id) on delete cascade,
  client_id uuid references client(id) on delete cascade,
  role text check (role in ('client','admin')) default 'client',
  created_at timestamptz default now(),
  primary key (user_id, client_id)
);

-- File metadata (bytes live in Supabase Storage)
create table if not exists file (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references client(id) on delete cascade,
  storage_path text not null,
  display_name text not null,
  mime_type text,
  size_bytes bigint,
  uploaded_by uuid references auth.users(id),
  uploaded_at timestamptz default now()
);

create index if not exists file_client_id_idx on file(client_id);
create index if not exists client_member_user_id_idx on client_member(user_id);

-- Row Level Security
alter table client enable row level security;
alter table client_member enable row level security;
alter table file enable row level security;

-- Helper: current user is an admin somewhere
create or replace function is_admin() returns boolean
language sql stable security definer as $$
  select exists (
    select 1 from client_member
    where user_id = auth.uid() and role = 'admin'
  );
$$;

-- client policies
drop policy if exists "members read own client" on client;
create policy "members read own client" on client
  for select using (
    exists (
      select 1 from client_member cm
      where cm.user_id = auth.uid() and cm.client_id = client.id
    )
    or is_admin()
  );

drop policy if exists "admins write clients" on client;
create policy "admins write clients" on client
  for all using (is_admin()) with check (is_admin());

-- client_member policies
drop policy if exists "read own memberships" on client_member;
create policy "read own memberships" on client_member
  for select using (user_id = auth.uid() or is_admin());

drop policy if exists "admins manage memberships" on client_member;
create policy "admins manage memberships" on client_member
  for all using (is_admin()) with check (is_admin());

-- file policies
drop policy if exists "members read own files" on file;
create policy "members read own files" on file
  for select using (
    exists (
      select 1 from client_member cm
      where cm.user_id = auth.uid() and cm.client_id = file.client_id
    )
    or is_admin()
  );

drop policy if exists "admins manage files" on file;
create policy "admins manage files" on file
  for all using (is_admin()) with check (is_admin());

-- Storage bucket
-- Run once in the Supabase Storage UI or via SQL:
-- insert into storage.buckets (id, name, public) values ('client-files', 'client-files', false) on conflict do nothing;
