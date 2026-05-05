-- 1. Products Table
create table if not exists products (
  id bigint primary key generated always as identity,
  name text not null,
  price numeric not null,
  original_price numeric,
  image text not null,
  category text not null,
  rating numeric default 0,
  reviews integer default 0,
  description text,
  features jsonb default '[]'::jsonb,
  badge text,
  stock integer default 0,
  sizes jsonb default '[]'::jsonb,
  colors jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Categories Table
create table if not exists categories (
  name text primary key,
  image text not null,
  count integer default 0
);

-- 3. Testimonials Table
create table if not exists testimonials (
  id bigint primary key generated always as identity,
  quote text not null,
  name text not null,
  role text not null,
  avatar text not null
);

-- 4. FAQs Table
create table if not exists faqs (
  id bigint primary key generated always as identity,
  question text not null,
  answer text not null
);

-- 5. Orders Table
create table if not exists orders (
  id text primary key,
  customer_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  city text not null,
  postal_code text not null,
  payment_method text not null,
  items jsonb not null,
  subtotal numeric not null,
  shipping numeric not null,
  total numeric not null,
  status text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  notes text
);

-- 6. Settings Table
create table if not exists settings (
  key text primary key,
  value jsonb not null
);

-- 7. Contact Submissions Table
create table if not exists contact_submissions (
  id text primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ENABLE RLS ON ALL TABLES
alter table products enable row level security;
alter table categories enable row level security;
alter table testimonials enable row level security;
alter table faqs enable row level security;
alter table orders enable row level security;
alter table settings enable row level security;
alter table contact_submissions enable row level security;

-- POLICIES: AUTHENTICATED USERS (ADMINS) CAN DO EVERYTHING
drop policy if exists "Admins can do everything" on products;
create policy "Admins can do everything" on products for all using (auth.role() = 'authenticated');
drop policy if exists "Admins can do everything" on categories;
create policy "Admins can do everything" on categories for all using (auth.role() = 'authenticated');
drop policy if exists "Admins can do everything" on testimonials;
create policy "Admins can do everything" on testimonials for all using (auth.role() = 'authenticated');
drop policy if exists "Admins can do everything" on faqs;
create policy "Admins can do everything" on faqs for all using (auth.role() = 'authenticated');
drop policy if exists "Admins can do everything" on orders;
create policy "Admins can do everything" on orders for all using (auth.role() = 'authenticated');
drop policy if exists "Admins can do everything" on settings;
create policy "Admins can do everything" on settings for all using (auth.role() = 'authenticated');
drop policy if exists "Admins can do everything" on contact_submissions;
create policy "Admins can do everything" on contact_submissions for all using (auth.role() = 'authenticated');

-- POLICIES: PUBLIC ACCESS (READ-ONLY)
drop policy if exists "Public read access" on products;
create policy "Public read access" on products for select using (true);
drop policy if exists "Public read access" on categories;
create policy "Public read access" on categories for select using (true);
drop policy if exists "Public read access" on testimonials;
create policy "Public read access" on testimonials for select using (true);
drop policy if exists "Public read access" on faqs;
create policy "Public read access" on faqs for select using (true);
drop policy if exists "Public read access" on settings;
create policy "Public read access" on settings for select using (true);

-- POLICIES: PUBLIC ACCESS (INSERT ONLY)
drop policy if exists "Public can create orders" on orders;
create policy "Public can create orders" on orders for insert with check (true);
drop policy if exists "Public can send messages" on contact_submissions;
create policy "Public can send messages" on contact_submissions for insert with check (true);

-- INITIAL SEED DATA
insert into categories (name, image, count) values
('Electronics', '/cat-electronics.jpg', 12),
('Home & Living', '/cat-home.jpg', 8),
('Fashion', '/cat-fashion.jpg', 6)
on conflict (name) do nothing;

insert into products (name, price, original_price, image, category, rating, reviews, description, features, badge, stock) values
('Minimal Wireless Earbuds', 89, 119, '/product-1.jpg', 'Electronics', 4.8, 234, 'Premium wireless earbuds...', '["ANC", "30h battery"]', 'Best Seller', 45),
('Ceramic Pour-Over Set', 45, null, '/product-2.jpg', 'Home & Living', 4.9, 156, 'Handcrafted ceramic...', '["Handcrafted", "Matte"]', 'New', 18)
on conflict do nothing;

insert into settings (key, value) values
('storeName', '"Cartzeno"'),
('currency', '"PKR"'),
('currencySymbol', '"Rs"'),
('exchangeRate', '1'),
('freeShippingThreshold', '50'),
('shippingCost', '5'),
('codEnabled', 'true'),
('cardPaymentEnabled', 'true'),
('saleActive', 'false'),
('saleBannerText', '"Flash Sale - Limited Time Only!"')
on conflict (key) do nothing;
