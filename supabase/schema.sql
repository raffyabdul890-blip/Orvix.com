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
