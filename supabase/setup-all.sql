-- =============================================================
-- W·H Inc. — Unified Supabase setup script
-- Includes:
--   1) schema.sql
--   2) seed-pages-3-6.sql
--   3) create-admin.sql
--
-- Run this single file in Supabase SQL Editor.
-- =============================================================

-- =============================================================
-- 1) schema.sql
-- =============================================================

-- Enable extensions
create extension if not exists "pgcrypto";

-- -------------------------------------------------------------
-- 1) Tables
-- -------------------------------------------------------------

create table if not exists public.regions (
  id          uuid primary key default gen_random_uuid(),
  num         text not null,
  area        text not null,
  en          text not null,
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
  date         text not null,
  category     text not null,
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

drop policy if exists "regions read all"   on public.regions;
drop policy if exists "producers read all" on public.producers;
drop policy if exists "products read all"  on public.products;
drop policy if exists "news read public"   on public.news;

create policy "regions read all"   on public.regions   for select using (true);
create policy "producers read all" on public.producers for select using (true);
create policy "products read all"  on public.products  for select using (true);
create policy "news read public"   on public.news      for select using (published = true);

drop policy if exists "admins read own" on public.admins;
create policy "admins read own" on public.admins
  for select to authenticated using (user_id = auth.uid());

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

create policy "news admin read all" on public.news
  for select to authenticated
  using (exists (select 1 from public.admins a where a.user_id = auth.uid()));

-- -------------------------------------------------------------
-- 3) Base seed data
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

-- =============================================================
-- 2) seed-pages-3-6.sql
-- =============================================================

delete from public.producers;
delete from public.news;
delete from public.regions;

insert into public.regions (num, area, en, farms, sort_order) values
  ('04', '中部',          'Chubu',             array['長野高原農園','静岡フレッシュ','山梨フルーツ'],                     40),
  ('07', '九州・沖縄',    'Kyushu & Okinawa',  array['熊本グリーン','鹿児島農園','沖縄野菜村','宮崎太陽ファーム'],        70),
  ('01', '北海道',        'Hokkaido',          array['十勝青果','美瑛農園','富良野ポテト'],                               10),
  ('05', '関西',          'Kansai',            array['淡路島農園','京野菜の里','和歌山みかん園'],                         50),
  ('02', '東北',          'Tohoku',            array['みちのく青果','山形ファーム','秋田アップル'],                        20),
  ('06', '中国・四国',    'Chugoku & Shikoku', array['瀬戸内ファーム','高知太陽農園','愛媛みかん'],                        60),
  ('03', '関東',          'Kanto',             array['茨城農園','千葉グリーン','埼玉農場','群馬高原ファーム'],             30);

insert into public.producers (num, name, name_en, region, image_url, items, note, sort_order) values
  ('06', '山本 真由美', 'Mayumi Yamamoto', '京都府',   null, array['京野菜','九条ねぎ','聖護院かぶ'], '京の伝統野菜を、現代の食卓へ。祖父の代から受け継ぐ畑で育てています。', 60),
  ('02', '佐藤 みどり', 'Midori Sato',     '熊本県',   null, array['ミニトマト','中玉トマト'], '甘みと酸味のバランスにこだわる、トマト専業農家。糖度は常に8度以上。', 20),
  ('09', '中村 剛',     'Tsuyoshi Nakamura','鹿児島県', null, array['さつまいも','大根'], '黒土と潮風が生む、ほくほくのさつまいもと、辛味ある桜島大根。', 90),
  ('04', '高橋 美佳',   'Mika Takahashi',  '北海道',   null, array['じゃがいも','玉ねぎ','アスパラガス'], '十勝の大地で、素材の旨みを引き出す根菜作り。雪解け水が甘みをひきたてます。', 40),
  ('01', '田中 健一',   'Kenichi Tanaka',  '茨城県',   null, array['小松菜','ほうれん草','水菜'], '土づくりからこだわった、葉物野菜の名手。無化学肥料で30年。', 10),
  ('08', '小林 友里',   'Yuri Kobayashi',  '静岡県',   null, array['みつば','わさび菜','クレソン'], '富士山の湧水で育む、香り豊かな葉物。料亭からの指名も多い、若手の注目農家。', 80),
  ('03', '鈴木 一郎',   'Ichiro Suzuki',   '千葉県',   null, array['人参','じゃがいも','大根'], '甘みのある根菜を、丁寧に育てています。海風と砂地がつくる、独特の食感。', 30),
  ('07', '伊藤 大輔',   'Daisuke Ito',     '兵庫県（淡路島）', null, array['玉ねぎ'], '三年がかりの土づくりが育む、極甘の淡路玉ねぎ。生でかじれる、と評判です。', 70),
  ('10', '吉田 亜希',   'Aki Yoshida',     '沖縄県',   null, array['ゴーヤ','ハンダマ','島らっきょう'], '琉球野菜を受け継ぎ、未来へつなぐ。年中出荷できるのが沖縄の強み。', 100),
  ('05', '渡辺 浩司',   'Koji Watanabe',   '長野県',   null, array['レタス','セロリ','ブロッコリー'], '標高1,000mの高原で育つ、シャキシャキ野菜。朝霧が旨みを閉じ込めます。', 50);

insert into public.news (date, category, category_ja, title, body, published, sort_order) values
  ('2025.12.22', 'Shipping', '出荷情報', '冬季限定「雪下人参」の受付を開始しました。', '北海道・十勝から、雪の下で熟成させた糖度10度超の人参をお届けします。年内の出荷分は限定数となります。お早めにお問い合わせください。', true, 110),
  ('2026.04.01', 'Notice', 'お知らせ', '新年度のご挨拶 ― 本年も生産者と取引先の皆さまの架け橋として尽力します。', '平素より格別のお引き立てを賜り、厚く御礼申し上げます。本年度も、全国の生産者の皆さまと取引先の皆さまをまっすぐつなぐ架け橋として、誠心誠意取り組んでまいります。', true, 20),
  ('2026.03.05', 'Producer', '生産者', '熊本県の新しいトマト農家・佐藤農園が協力ネットワークに加わりました。', '熊本県で代々トマト栽培に取り組んでいらっしゃる佐藤農園さまが、当社の協力農家ネットワークに加わりました。3月下旬より中玉トマト・ミニトマトの出荷を予定しております。', true, 50),
  ('2026.02.18', 'Shipping', '出荷情報', '寒波の影響による葉物野菜の出荷状況について。', '2月中旬の寒波により、一部の産地における葉物野菜の出荷に遅れが発生しております。影響を受けるお客様には個別にご連絡を差し上げておりますが、ご不明点は営業担当までお問い合わせください。', true, 60),
  ('2026.04.15', 'Shipping', '出荷情報', '春野菜の出荷が本格スタート。グリーンリーフ・水菜の安定供給を開始しました。', '4月に入り、関東・東北エリアの春野菜の出荷が本格化しました。本年もグリーンリーフ・水菜・小松菜を中心に、安定した供給体制を整えてまいります。', true, 10),
  ('2026.01.10', 'Company', '会社情報', '新年のご挨拶 ― 2026年も、日本の農業に愛を込めて。', '旧年中は格別のご高配を賜り、誠にありがとうございました。本年も全国の生産者の皆さまと、お客様のお役に立てるよう精進してまいります。', true, 90),
  ('2026.03.20', 'Company', '会社情報', '川口センターの営業時間変更について (4月1日より)。', '2026年4月1日より、川口センターの営業時間を下記のとおり変更いたします。平日: 6:00 – 17:00 / 土曜: 7:00 – 15:00。ご不便をおかけしますが、何卒ご理解のほどよろしくお願い申し上げます。', true, 40),
  ('2026.02.05', 'Notice', 'お知らせ', '決算期休業のお知らせ (3月28日〜30日)。', '誠に勝手ながら、決算業務のため 3月28日(土)〜30日(月) を臨時休業とさせていただきます。休業期間中のご注文は4月1日以降、順次対応いたします。', true, 70),
  ('2026.03.25', 'Producer', '生産者', '京都・山本農園との新パートナーシップを締結しました。', '長年京野菜の生産に携わる山本農園さまと、通年での供給契約を新たに締結いたしました。九条ねぎ・聖護院かぶなど、京の伝統野菜を安定してお届けいたします。', true, 30),
  ('2026.01.20', 'Notice', 'お知らせ', 'WEBサイトをリニューアルいたしました。', 'このたび、当社の公式ウェブサイトを全面的にリニューアルいたしました。生産者紹介や取扱品目のページを拡充し、より分かりやすい構成に改めております。今後とも、どうぞよろしくお願い申し上げます。', true, 80),
  ('2025.11.15', 'Producer', '生産者', '沖縄・吉田農園の島野菜ラインナップが拡充されました。', 'ハンダマ・島らっきょう・ナーベラーなど、沖縄ならではの島野菜の通年出荷が可能になりました。飲食店の皆さまからのご要望にお応えしてまいります。', true, 120),
  ('2025.10.10', 'Shipping', '出荷情報', '秋の根菜出荷、本格始動。', '北海道・長野・茨城より、秋の旬を迎えた根菜類の出荷が始まりました。糖度の高い人参・玉ねぎ・じゃがいもを、産地直送でお届けします。', true, 130);

-- =============================================================
-- 3) create-admin.sql
-- =============================================================

do $$
declare
  v_email    text := 'admin@gmail.com';
  v_password text := 'Admin@gmail.com';
  v_user_id  uuid;
begin
  select id into v_user_id from auth.users where email = v_email;

  if v_user_id is null then
    v_user_id := gen_random_uuid();

    insert into auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, created_at, updated_at,
      raw_app_meta_data, raw_user_meta_data,
      confirmation_token, email_change, email_change_token_new, recovery_token,
      is_super_admin, is_anonymous
    ) values (
      '00000000-0000-0000-0000-000000000000',
      v_user_id,
      'authenticated', 'authenticated',
      v_email,
      crypt(v_password, gen_salt('bf')),
      now(), now(), now(),
      '{"provider":"email","providers":["email"]}'::jsonb, '{}'::jsonb,
      '', '', '', '',
      false, false
    );

    insert into auth.identities (
      id, user_id, identity_data, provider, provider_id,
      last_sign_in_at, created_at, updated_at
    ) values (
      gen_random_uuid(),
      v_user_id,
      jsonb_build_object(
        'sub', v_user_id::text,
        'email', v_email,
        'email_verified', true,
        'phone_verified', false
      ),
      'email',
      v_user_id::text,
      now(), now(), now()
    );
  else
    update auth.users
    set encrypted_password   = crypt(v_password, gen_salt('bf')),
        email_confirmed_at   = coalesce(email_confirmed_at, now()),
        updated_at           = now()
    where id = v_user_id;
  end if;

  insert into public.admins (user_id, email)
  values (v_user_id, v_email)
  on conflict (user_id) do update set email = excluded.email;
end
$$;
