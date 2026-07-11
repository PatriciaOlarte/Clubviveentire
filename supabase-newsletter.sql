create table if not exists public.entire_newsletter_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  recommended_product text,
  quiz_answers jsonb not null default '{}'::jsonb,
  campaign_data jsonb not null default '{}'::jsonb,
  consent boolean not null default false,
  source text not null default 'landing_entire_selector',
  page_path text,
  referrer text,
  landing_url text,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint entire_newsletter_email_format check (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$'),
  constraint entire_newsletter_consent_required check (consent = true)
);

create unique index if not exists entire_newsletter_leads_email_source_idx
  on public.entire_newsletter_leads (email, source);

create index if not exists entire_newsletter_leads_created_at_idx
  on public.entire_newsletter_leads (created_at desc);

create index if not exists entire_newsletter_leads_recommended_product_idx
  on public.entire_newsletter_leads (recommended_product);

alter table public.entire_newsletter_leads
  add column if not exists campaign_data jsonb not null default '{}'::jsonb,
  add column if not exists referrer text,
  add column if not exists landing_url text;

alter table public.entire_newsletter_leads enable row level security;

drop policy if exists "Allow public newsletter signup" on public.entire_newsletter_leads;
create policy "Allow public newsletter signup"
  on public.entire_newsletter_leads
  for insert
  to anon
  with check (consent = true);

drop policy if exists "No public newsletter reads" on public.entire_newsletter_leads;
create policy "No public newsletter reads"
  on public.entire_newsletter_leads
  for select
  to anon
  using (false);

create or replace function public.set_entire_newsletter_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_entire_newsletter_updated_at on public.entire_newsletter_leads;
create trigger set_entire_newsletter_updated_at
  before update on public.entire_newsletter_leads
  for each row
  execute function public.set_entire_newsletter_updated_at();

create table if not exists public.entire_landing_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  recommended_product text,
  campaign_data jsonb not null default '{}'::jsonb,
  metadata jsonb not null default '{}'::jsonb,
  page_path text,
  referrer text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists entire_landing_events_created_at_idx
  on public.entire_landing_events (created_at desc);

create index if not exists entire_landing_events_event_name_idx
  on public.entire_landing_events (event_name);

create index if not exists entire_landing_events_recommended_product_idx
  on public.entire_landing_events (recommended_product);

alter table public.entire_landing_events enable row level security;

drop policy if exists "Allow public landing event insert" on public.entire_landing_events;
create policy "Allow public landing event insert"
  on public.entire_landing_events
  for insert
  to anon
  with check (event_name <> '');

drop policy if exists "No public landing event reads" on public.entire_landing_events;
create policy "No public landing event reads"
  on public.entire_landing_events
  for select
  to anon
  using (false);
