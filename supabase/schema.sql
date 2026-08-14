-- Run this once in the Supabase SQL Editor (Project > SQL Editor > New query)
-- to create the leads table used by the Hero intake form, the Audit modal,
-- and (in future) any other lead-capture surface on orvix.com.

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  company text,
  website text,
  interest text,
  message text,
  sms_opt_in boolean not null default false,
  source text not null
);

alter table public.leads enable row level security;

-- The frontend uses the public anon key, so it can only INSERT — it can
-- never read, update, or delete rows. Read the table from the Supabase
-- dashboard or with the service role key instead.
drop policy if exists "Public can insert leads" on public.leads;
create policy "Public can insert leads"
  on public.leads
  for insert
  to anon
  with check (true);

-- Reviews table used by the homepage Testimonials section. New reviews are
-- inserted as unapproved (approved = false) so they don't go live until
-- someone flips the flag from the Supabase dashboard's table editor.
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  rating smallint not null check (rating between 1 and 5),
  author_name text not null,
  company text,
  feedback text not null,
  approved boolean not null default false
);

alter table public.reviews enable row level security;

-- Anyone can submit a review...
drop policy if exists "Public can insert reviews" on public.reviews;
create policy "Public can insert reviews"
  on public.reviews
  for insert
  to anon
  with check (true);

-- ...but only approved reviews are readable publicly.
drop policy if exists "Public can read approved reviews" on public.reviews;
create policy "Public can read approved reviews"
  on public.reviews
  for select
  to anon
  using (approved = true);

-- Customer workspace: orders. Rows are created on the backend/by the Orvix
-- team when a project kicks off — there is no public insert policy, so a
-- brand-new account genuinely starts with zero orders until real work
-- exists. `amount_cents` and `status` double as the source for the
-- workspace's Billing view too, rather than maintaining a parallel table.
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users(id) on delete cascade,
  service_name text not null,
  status text not null default 'pending'
    check (status in ('pending', 'in_progress', 'completed', 'cancelled')),
  amount_cents integer,
  notes text
);

alter table public.orders enable row level security;

drop policy if exists "Users can read their own orders" on public.orders;
create policy "Users can read their own orders"
  on public.orders
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Customer workspace: messages. Signed-in users can read and send their own
-- messages; replies from the team are inserted server-side (service role),
-- not by this public policy.
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid not null references auth.users(id) on delete cascade,
  sender text not null default 'user' check (sender in ('user', 'team')),
  body text not null
);

alter table public.messages enable row level security;

drop policy if exists "Users can read their own messages" on public.messages;
create policy "Users can read their own messages"
  on public.messages
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can send their own messages" on public.messages;
create policy "Users can send their own messages"
  on public.messages
  for insert
  to authenticated
  with check (auth.uid() = user_id and sender = 'user');

-- ============================================================================
-- Admin console (app/admin-secret-portal). Run everything below once too.
-- ============================================================================

-- Profiles mirror auth.users (email/name) so the admin console can show a
-- sender's name/email for workspace messages without needing the service
-- role key or access to the auth schema. Auto-populated on signup.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill profiles for any accounts created before this migration existed.
insert into public.profiles (id, email, full_name)
select id, email, coalesce(raw_user_meta_data ->> 'full_name', raw_user_meta_data ->> 'name')
from auth.users
on conflict (id) do nothing;

-- Admin allowlist. Nobody can read/write this table through the API — not
-- even authenticated users — it's managed exclusively from the SQL editor.
-- To grant yourself admin access: sign up normally on the site first, then
-- run (with your real email):
--
--   insert into public.admin_users (user_id, email)
--   select id, email from auth.users where email = 'you@example.com';
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- Runs with the definer's privileges so RLS policies elsewhere can check
-- admin status without granting any role direct access to admin_users.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

-- Admins can read and update every lead (status toggle from the console).
drop policy if exists "Admins can read all leads" on public.leads;
create policy "Admins can read all leads"
  on public.leads
  for select
  to authenticated
  using (public.is_admin());

drop policy if exists "Admins can update all leads" on public.leads;
create policy "Admins can update all leads"
  on public.leads
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

alter table public.leads
  add column if not exists status text not null default 'new'
    check (status in ('new', 'in_progress', 'closed'));

-- Admins can read every workspace message (in addition to each user's own).
drop policy if exists "Admins can read all messages" on public.messages;
create policy "Admins can read all messages"
  on public.messages
  for select
  to authenticated
  using (public.is_admin());

-- Admins can read every profile (to show sender name/email for messages).
drop policy if exists "Admins can read all profiles" on public.profiles;
create policy "Admins can read all profiles"
  on public.profiles
  for select
  to authenticated
  using (public.is_admin());
