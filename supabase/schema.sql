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
