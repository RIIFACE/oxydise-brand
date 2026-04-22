-- Oxydise portal: file categories + internal client flag
-- Paste into the Supabase SQL editor for the Oxydise Portal project.

-- Mark a client row as the internal Oxydise team so the UI can show a
-- separate "Internal" section for its members.
alter table client
  add column if not exists is_internal boolean not null default false;

-- Organise files into a small, known set of categories.
alter table file
  add column if not exists category text
    check (category in (
      'logo','pdf','font','brochure','photo','video','social_template','other'
    ))
    default 'other';

create index if not exists file_category_idx on file(category);

-- Seed the internal Oxydise client. Add team members to this client via
-- /portal/admin (role = admin or client — both will see internal files).
insert into client (name, slug, is_internal)
values ('Oxydise Internal', 'oxydise-internal', true)
on conflict (slug) do nothing;
