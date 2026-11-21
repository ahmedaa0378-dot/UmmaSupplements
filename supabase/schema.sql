-- UMMA Supplements: first-pass schema for Supabase (Postgres).
-- Mirrors src/content/site.ts so the admin portal can edit everything shown on the site.
-- Not applied yet. Orders, customers and discount codes are added in the commerce phase.

create table products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  short text not null,
  kind text not null check (kind in ('Food supplement', 'Personal care')),
  size text not null,
  intro text not null,
  ingredients text not null,
  facts jsonb not null default '[]',      -- [{term, detail}]
  how_to jsonb not null default '[]',     -- ["step", ...]
  image_url text,
  image_alt text,
  hero_video_url text,
  is_published boolean not null default false,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table product_packs (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products (id) on delete cascade,
  label text not null,                    -- "One jar", "Two jars"
  note text,                              -- "25 days"
  price_inr int not null,
  compare_at_inr int,
  stock int not null default 0,
  sort_order int not null default 0
);

-- One row per editable block on the homepage: announcement, hero, ritual, films, value_pack, faq.
create table home_sections (
  key text primary key,
  content jsonb not null,
  is_visible boolean not null default true,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table certificates (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products (id) on delete cascade,
  issuer text not null,
  certificate_number text not null,
  valid_until date not null,
  verify_url text,
  document_url text,
  updated_at timestamptz not null default now()
);

alter table products enable row level security;
alter table product_packs enable row level security;
alter table home_sections enable row level security;
alter table certificates enable row level security;

-- The public site may read; only the admin (service role or an admin policy added later) may write.
create policy "public read products" on products for select using (is_published);
create policy "public read packs" on product_packs for select using (true);
create policy "public read home" on home_sections for select using (is_visible);
create policy "public read certificates" on certificates for select using (true);
