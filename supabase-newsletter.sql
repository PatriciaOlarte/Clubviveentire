create table if not exists public.entire_newsletter_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  recommended_product text,
  quiz_answers jsonb not null default '{}'::jsonb,
  consent boolean not null default false,
  source text not null default 'landing_entire_selector',
  page_path text,
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
