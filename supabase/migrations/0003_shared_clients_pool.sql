-- Simplify the portal model: one shared "Clients" pool that every invited
-- external user can see. No per-client orgs or slugs exposed in the UI —
-- upload and invite just choose Internal vs Client.
--
-- Paste into the Supabase SQL editor for the Oxydise Portal project after
-- 0002_categories_internal.sql.

insert into client (name, slug, is_internal)
values ('Clients', 'clients', false)
on conflict (slug) do nothing;
