create table if not exists public.user_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  display_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.destinations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text not null,
  continent text not null,
  lat double precision not null,
  lng double precision not null,
  spotlight text not null
);

create table if not exists public.trip_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  destination_id uuid not null references public.destinations (id) on delete cascade,
  visited_at timestamptz not null default now(),
  notes text
);

create table if not exists public.continent_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  continent text not null,
  visited boolean not null default false,
  primary key (user_id, continent)
);

create view public.travel_stats as
select
  tl.user_id,
  count(*)::int as trips,
  count(distinct d.country)::int as countries,
  count(distinct d.continent)::int as continents,
  greatest(count(*)::int * 2, 0)::int as wine_bottles
from public.trip_logs tl
join public.destinations d on d.id = tl.destination_id
group by tl.user_id;

alter table public.user_profiles enable row level security;
alter table public.trip_logs enable row level security;
alter table public.continent_progress enable row level security;
alter table public.destinations enable row level security;

create policy "user profile owner"
on public.user_profiles for all
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "trip logs owner"
on public.trip_logs for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "continent progress owner"
on public.continent_progress for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "destinations readable"
on public.destinations for select
using (true);

create policy "destinations service-role write"
on public.destinations for all
using (auth.role() = 'service_role')
with check (auth.role() = 'service_role');
