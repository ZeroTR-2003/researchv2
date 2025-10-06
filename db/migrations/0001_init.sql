-- 0001_init.sql
-- Initial schema: extensions, types, tables, indexes, and RLS policies for Problems → Opportunities (Namibia)

-- Extensions
create extension if not exists pgcrypto;
create extension if not exists vector;

-- Types
create type public.user_role as enum ('student','moderator','partner','admin');
create type public.submission_status as enum ('pending_review','needs_info','approved','rejected','merged');
create type public.project_status as enum ('planning','active','paused','completed');
create type public.mentor_verification_status as enum ('pending','verified','rejected');

-- Helper function to auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Core tables
create table if not exists public.regions (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  code text unique,
  latitude numeric(9,6),
  longitude numeric(9,6),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.institutions (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  kind text, -- e.g., university, NGO, government, incubator
  region_id uuid references public.regions(id) on delete set null,
  website text,
  verified boolean not null default false,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Users table (application profile). In Supabase, this typically pairs with auth.users
create table if not exists public.users (
  id uuid primary key, -- should equal auth.uid()
  email text unique,
  full_name text,
  role public.user_role not null default 'student',
  reputation integer not null default 0,
  institution_id uuid references public.institutions(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  tags text[] not null default array[]::text[],
  region_id uuid references public.regions(id) on delete set null,
  institution_id uuid references public.institutions(id) on delete set null,
  year integer,
  source_url text,
  attachments jsonb not null default '[]'::jsonb,
  status public.submission_status not null default 'pending_review',
  automated_checks jsonb not null default '{}'::jsonb,
  canonical_hash text,
  provenance jsonb not null default '{}'::jsonb,
  created_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.problems (
  id uuid primary key default gen_random_uuid(),
  canonical_text text not null,
  summary text not null,
  tags text[] not null default array[]::text[],
  region_id uuid references public.regions(id) on delete set null,
  institution_id uuid references public.institutions(id) on delete set null,
  year integer,
  source_url text,
  vetted boolean not null default false,
  vector vector(1536), -- embedding dimension (match your provider)
  metadata jsonb not null default '{}'::jsonb, -- stores AI outputs (Opportunity Card, etc.)
  attachments jsonb not null default '[]'::jsonb,
  created_by uuid references public.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  problem_id uuid references public.problems(id) on delete set null,
  title text not null,
  summary text,
  owner_id uuid references public.users(id) on delete set null,
  team_member_ids uuid[] not null default array[]::uuid[],
  tasks jsonb not null default '[]'::jsonb,
  links jsonb not null default '{}'::jsonb,
  status public.project_status not null default 'planning',
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.mentors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references public.users(id) on delete cascade,
  skills text[] not null default array[]::text[],
  region_id uuid references public.regions(id) on delete set null,
  availability text, -- e.g., hours per week, time slots
  contact jsonb not null default '{}'::jsonb, -- e.g., {email, phone_pref}
  verification_status public.mentor_verification_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.funding_opportunities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text, -- grant, incubator, prize
  target_regions text[] not null default array[]::text[],
  sectors text[] not null default array[]::text[],
  deadline date,
  url text,
  requirements text,
  vector vector(1536),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id bigserial primary key,
  user_id uuid references public.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  before jsonb,
  after jsonb,
  created_at timestamptz not null default now()
);

-- Triggers for updated_at
create trigger trg_regions_updated
before update on public.regions
for each row execute function public.set_updated_at();

create trigger trg_institutions_updated
before update on public.institutions
for each row execute function public.set_updated_at();

create trigger trg_users_updated
before update on public.users
for each row execute function public.set_updated_at();

create trigger trg_submissions_updated
before update on public.submissions
for each row execute function public.set_updated_at();

create trigger trg_problems_updated
before update on public.problems
for each row execute function public.set_updated_at();

create trigger trg_projects_updated
before update on public.projects
for each row execute function public.set_updated_at();

create trigger trg_mentors_updated
before update on public.mentors
for each row execute function public.set_updated_at();

create trigger trg_funding_opportunities_updated
before update on public.funding_opportunities
for each row execute function public.set_updated_at();

-- Indexes
create index if not exists idx_submissions_tags on public.submissions using gin (tags);
create index if not exists idx_problems_tags on public.problems using gin (tags);
create index if not exists idx_problems_metadata on public.problems using gin (metadata);
create index if not exists idx_funding_sectors on public.funding_opportunities using gin (sectors);

-- Vector indexes (require data loaded; IVFFLAT benefits from ANALYZE)
-- You can adjust lists based on data size
create index if not exists idx_problems_vector on public.problems using ivfflat (vector) with (lists = 100);
create index if not exists idx_funding_vector on public.funding_opportunities using ivfflat (vector) with (lists = 100);

-- Role helper functions (depend on public.users)
create or replace function public.is_admin()
returns boolean language sql stable as $$
  select exists (
    select 1 from public.users u where u.id = auth.uid() and u.role = 'admin'
  );
$$;

create or replace function public.is_moderator()
returns boolean language sql stable as $$
  select exists (
    select 1 from public.users u where u.id = auth.uid() and u.role in ('admin','moderator')
  );
$$;

-- RLS enablement
alter table public.regions enable row level security;
alter table public.institutions enable row level security;
alter table public.users enable row level security;
alter table public.submissions enable row level security;
alter table public.problems enable row level security;
alter table public.projects enable row level security;
alter table public.mentors enable row level security;
alter table public.funding_opportunities enable row level security;
alter table public.audit_logs enable row level security;

-- RLS policies
-- Regions: readable by anyone; only admins can write
create policy if not exists regions_read_all on public.regions
for select using (true);
create policy if not exists regions_write_admin on public.regions
for all using (public.is_admin()) with check (public.is_admin());

-- Institutions: readable by anyone; write by moderators
create policy if not exists institutions_read_all on public.institutions
for select using (true);
create policy if not exists institutions_write_mod on public.institutions
for all using (public.is_moderator()) with check (public.is_moderator());

-- Users: self-readable/updatable; moderators can read all; admins can update any
create policy if not exists users_read_own_or_mod on public.users
for select using (id = auth.uid() or public.is_moderator());
create policy if not exists users_insert_self_or_mod on public.users
for insert with check (id = auth.uid() or public.is_moderator());
create policy if not exists users_update_self_or_admin on public.users
for update using (id = auth.uid() or public.is_admin()) with check (id = auth.uid() or public.is_admin());
create policy if not exists users_delete_admin on public.users
for delete using (public.is_admin());

-- Submissions
-- Select: creator or moderators
create policy if not exists submissions_read_own_or_mod on public.submissions
for select using (created_by = auth.uid() or public.is_moderator());
-- Insert: any authenticated user for themselves
create policy if not exists submissions_insert_self on public.submissions
for insert with check (auth.uid() is not null and created_by = auth.uid());
-- Update: creator while pending/needs_info; moderators anytime
create policy if not exists submissions_update_creator_limited on public.submissions
for update using (
  created_by = auth.uid() and status in ('pending_review','needs_info')::public.submission_status[]
) with check (
  created_by = auth.uid() and status in ('pending_review','needs_info')::public.submission_status[]
);
create policy if not exists submissions_update_mod on public.submissions
for update using (public.is_moderator()) with check (public.is_moderator());
-- Delete: creator while pending; moderators anytime
create policy if not exists submissions_delete_creator_pending on public.submissions
for delete using (created_by = auth.uid() and status = 'pending_review');
create policy if not exists submissions_delete_mod on public.submissions
for delete using (public.is_moderator());

-- Problems
-- Public can read vetted problems; creator and moderators can read all
create policy if not exists problems_read_public_or_owner_or_mod on public.problems
for select using (vetted = true or created_by = auth.uid() or public.is_moderator());
-- Insert/update/delete only by moderators (promoted from submissions)
create policy if not exists problems_write_mod on public.problems
for all using (public.is_moderator()) with check (public.is_moderator());

-- Projects
-- Read if public, owner/member, or moderator
create policy if not exists projects_read_public_or_member_or_mod on public.projects
for select using (
  is_public = true or owner_id = auth.uid() or auth.uid() = any(team_member_ids) or public.is_moderator()
);
-- Insert by owner (self) or moderator
create policy if not exists projects_insert_owner_or_mod on public.projects
for insert with check (owner_id = auth.uid() or public.is_moderator());
-- Update by owner/member or moderator
create policy if not exists projects_update_member_or_mod on public.projects
for update using (
  owner_id = auth.uid() or auth.uid() = any(team_member_ids) or public.is_moderator()
) with check (
  owner_id = auth.uid() or auth.uid() = any(team_member_ids) or public.is_moderator()
);
-- Delete by owner or admin
create policy if not exists projects_delete_owner_or_admin on public.projects
for delete using (owner_id = auth.uid() or public.is_admin());

-- Mentors
-- Read all; insert/update own; moderators can update any
create policy if not exists mentors_read_all on public.mentors
for select using (true);
create policy if not exists mentors_insert_self on public.mentors
for insert with check (user_id = auth.uid());
create policy if not exists mentors_update_self_or_mod on public.mentors
for update using (user_id = auth.uid() or public.is_moderator()) with check (user_id = auth.uid() or public.is_moderator());
create policy if not exists mentors_delete_self_or_admin on public.mentors
for delete using (user_id = auth.uid() or public.is_admin());

-- Funding
-- Read all; write by moderators
create policy if not exists funding_read_all on public.funding_opportunities
for select using (true);
create policy if not exists funding_write_mod on public.funding_opportunities
for all using (public.is_moderator()) with check (public.is_moderator());

-- Audit logs
-- Read by moderators; inserts typically via service role or functions
create policy if not exists audit_logs_read_mod on public.audit_logs
for select using (public.is_moderator());
