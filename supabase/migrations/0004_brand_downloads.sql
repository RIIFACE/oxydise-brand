-- Brand downloads — public-bucket assets surfaced on /downloads (no auth).
-- Paste into the Oxydise Portal Supabase SQL editor.

-- Track which storage bucket each file lives in. Existing rows stay on
-- 'client-files'. Rows uploaded as audience=public land in 'brand-downloads'.
alter table file
  add column if not exists bucket text not null default 'client-files';

-- Seed the brand-downloads "client" row. Files attached to it surface on
-- the public /downloads page.
insert into client (name, slug, is_internal)
values ('Brand downloads', 'brand-downloads', false)
on conflict (slug) do nothing;

-- Public storage bucket. The bytes are publicly readable; metadata in the
-- file table is non-sensitive (display names, sizes).
insert into storage.buckets (id, name, public)
values ('brand-downloads', 'brand-downloads', true)
on conflict (id) do nothing;
