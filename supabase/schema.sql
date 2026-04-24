-- =============================================================
-- W·H Inc. — Supabase schema
-- Paste this entire file into the Supabase SQL editor and run it
-- once. It creates tables, enables Row-Level Security, installs
-- policies, and seeds initial content matching the static site.
-- =============================================================

-- Enable extensions
create extension if not exists "pgcrypto";

-- -------------------------------------------------------------
-- 1) Tables
-- -------------------------------------------------------------

create table if not exists public.regions (
  id          uuid primary key default gen_random_uuid(),
  num         text not null,                       -- "01", "02"
  area        text not null,                       -- "北海道"
  en          text not null,                       -- "Hokkaido"
  farms       text[] not null default '{}',
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.producers (
  id          uuid primary key default gen_random_uuid(),
  num         text not null,
  name        text not null,
  name_en     text not null,
  region      text not null,
  image_url   text,
  items       text[] not null default '{}',
  note        text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  ja          text not null,
  en          text not null,
  emoji       text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.news (
  id           uuid primary key default gen_random_uuid(),
  date         text not null,                      -- "2026.04.15"
  category     text not null,                      -- "Shipping" | "Notice" | "Company" | "Producer"
  category_ja  text,
  title        text not null,
  body         text,
  published    boolean not null default true,
  sort_order   int not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table if not exists public.admins (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  created_at  timestamptz not null default now()
);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end; $$;

drop trigger if exists trg_regions_updated_at on public.regions;
create trigger trg_regions_updated_at before update on public.regions
  for each row execute function public.set_updated_at();

drop trigger if exists trg_producers_updated_at on public.producers;
create trigger trg_producers_updated_at before update on public.producers
  for each row execute function public.set_updated_at();

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at before update on public.products
  for each row execute function public.set_updated_at();

drop trigger if exists trg_news_updated_at on public.news;
create trigger trg_news_updated_at before update on public.news
  for each row execute function public.set_updated_at();

-- -------------------------------------------------------------
-- 2) RLS
-- -------------------------------------------------------------

alter table public.regions   enable row level security;
alter table public.producers enable row level security;
alter table public.products  enable row level security;
alter table public.news      enable row level security;
alter table public.admins    enable row level security;

-- Public SELECT (anyone including anon can read)
drop policy if exists "regions read all"   on public.regions;
drop policy if exists "producers read all" on public.producers;
drop policy if exists "products read all"  on public.products;
drop policy if exists "news read public"   on public.news;

create policy "regions read all"   on public.regions   for select using (true);
create policy "producers read all" on public.producers for select using (true);
create policy "products read all"  on public.products  for select using (true);
-- Public can only see published news; admins see everything via a separate policy
create policy "news read public"   on public.news      for select using (published = true);

-- Admins-only: helper check
drop policy if exists "admins read own" on public.admins;
create policy "admins read own" on public.admins
  for select to authenticated using (user_id = auth.uid());

-- Admin writes — any authenticated user whose user_id is in admins
drop policy if exists "regions admin write"   on public.regions;
drop policy if exists "producers admin write" on public.producers;
drop policy if exists "products admin write"  on public.products;
drop policy if exists "news admin write"      on public.news;
drop policy if exists "news admin read all"   on public.news;

create policy "regions admin write" on public.regions
  for all to authenticated
  using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
  with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));

create policy "producers admin write" on public.producers
  for all to authenticated
  using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
  with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));

create policy "products admin write" on public.products
  for all to authenticated
  using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
  with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));

create policy "news admin write" on public.news
  for all to authenticated
  using (exists (select 1 from public.admins a where a.user_id = auth.uid()))
  with check (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- Admins can SELECT unpublished news too (needed for admin listing)
create policy "news admin read all" on public.news
  for select to authenticated
  using (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- -------------------------------------------------------------
-- 3) Seed data
-- -------------------------------------------------------------

insert into public.regions (num, area, en, farms, sort_order) values
  ('01', '北海道',        'Hokkaido',          array['十勝青果','美瑛農園'],                      10),
  ('02', '東北',          'Tohoku',            array['みちのく青果','山形ファーム'],               20),
  ('03', '関東',          'Kanto',             array['茨城農園','千葉グリーン','埼玉農場'],         30),
  ('04', '中部',          'Chubu',             array['長野高原農園','静岡フレッシュ'],             40),
  ('05', '関西',          'Kansai',            array['淡路島農園','京野菜の里'],                    50),
  ('06', '中国・四国',    'Chugoku & Shikoku', array['瀬戸内ファーム'],                             60),
  ('07', '九州・沖縄',    'Kyushu & Okinawa',  array['熊本グリーン','鹿児島農園','沖縄野菜村'],     70)
on conflict do nothing;

insert into public.producers (num, name, name_en, region, items, note, sort_order) values
  ('01', '田中 健一',   'Kenichi Tanaka', '茨城県', array['小松菜','ほうれん草','水菜'], '土づくりからこだわった、葉物野菜の名手。', 10),
  ('02', '佐藤 みどり', 'Midori Sato',    '熊本県', array['ミニトマト','中玉トマト'],     '甘みと酸味のバランスにこだわる、トマト専業農家。', 20),
  ('03', '鈴木 一郎',   'Ichiro Suzuki',  '千葉県', array['人参','じゃがいも'],           '甘みのある根菜を、丁寧に育てています。', 30)
on conflict do nothing;

insert into public.products (ja, en, emoji, sort_order) values
  ('グリーンリーフ','Green Leaf','🥬', 10),
  ('水菜',         'Mizuna',    '🌿', 20),
  ('ミニトマト',    'Mini Tomato','🍅', 30),
  ('紅芯大根',     'Red Radish',  '🌸', 40),
  ('国産人参',     'Carrot',      '🥕', 50),
  ('長ネギ',       'Naga-negi',   '🌱', 60),
  ('レタス',       'Lettuce',     '🥬', 70),
  ('小松菜',       'Komatsuna',   '🌿', 80),
  ('じゃがいも',    'Potato',      '🥔', 90),
  ('玉ねぎ',       'Onion',       '🧅', 100),
  ('ほうれん草',    'Spinach',     '🌱', 110),
  ('キャベツ',     'Cabbage',     '🥬', 120),
  ('白菜',         'Hakusai',     '🌿', 130),
  ('ブロッコリー',  'Broccoli',    '🥦', 140),
  ('大根',         'Daikon',      '⚪',  150),
  ('きゅうり',     'Cucumber',    '🥒', 160)
on conflict do nothing;

insert into public.news (date, category, category_ja, title, body, published, sort_order) values
  ('2026.04.15', 'Shipping', '出荷情報',
   '春野菜の出荷が本格スタート。グリーンリーフ・水菜の安定供給を開始しました。',
   '4月に入り、関東・東北エリアの春野菜の出荷が本格化しました。本年もグリーンリーフ・水菜・小松菜を中心に、安定した供給体制を整えてまいります。',
   true, 10),
  ('2026.04.01', 'Notice',   'お知らせ',
   '新年度のご挨拶 ― 本年も生産者と取引先の皆さまの架け橋として尽力します。',
   '平素より格別のお引き立てを賜り、厚く御礼申し上げます。本年度も、全国の生産者の皆さまと取引先の皆さまをまっすぐつなぐ架け橋として、誠心誠意取り組んでまいります。',
   true, 20),
  ('2026.03.20', 'Company',  '会社情報',
   '川口センターの営業時間変更について (4月1日より)。',
   '2026年4月1日より、川口センターの営業時間を下記のとおり変更いたします。平日: 6:00 – 17:00 / 土曜: 7:00 – 15:00。',
   true, 30),
  ('2026.03.05', 'Producer', '生産者',
   '熊本県の新しいトマト農家・佐藤農園が協力ネットワークに加わりました。',
   '熊本県で代々トマト栽培に取り組んでいらっしゃる佐藤農園さまが、当社の協力農家ネットワークに加わりました。',
   true, 40),
  ('2026.02.18', 'Shipping', '出荷情報',
   '寒波の影響による葉物野菜の出荷状況について。',
   '2月中旬の寒波により、一部の産地における葉物野菜の出荷に遅れが発生しております。',
   true, 50),
  ('2026.01.20', 'Notice',   'お知らせ',
   'WEBサイトをリニューアルいたしました。',
   'このたび、当社の公式ウェブサイトを全面的にリニューアルいたしました。',
   true, 60)
on conflict do nothing;

-- -------------------------------------------------------------
-- 4) Bootstrap an admin
-- -------------------------------------------------------------
-- After creating an auth user via the Supabase dashboard
-- (Authentication → Users → Add user), run:
--
--   insert into public.admins (user_id, email)
--   select id, email from auth.users where email = 'you@example.com'
--   on conflict do nothing;
--
-- Or sign up via the /admin login page first, then run that insert.
