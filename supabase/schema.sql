-- Run in Supabase SQL editor as project owner. Never put service_role in frontend.
create extension if not exists pgcrypto;
create table if not exists public.admin_users (user_id uuid primary key references auth.users(id) on delete cascade);
create table if not exists public.store_settings (id integer primary key default 1 check(id=1), whatsapp_cc text not null default '212', whatsapp_number text not null default '', phone_cc text not null default '212', phone_number text not null default '', logo_url text, logo_path text, hero_url text, hero_path text, imported boolean not null default false);
insert into public.store_settings(id) values(1) on conflict(id) do nothing;
create table if not exists public.store_socials (id uuid primary key default gen_random_uuid(), platform text not null check(platform in ('instagram','tiktok','youtube','facebook','x','pinterest','snapchat','linkedin','threads','telegram')), url text not null, sort_order integer not null default 0);
create table if not exists public.store_categories (id text primary key, name_ar text not null check(length(trim(name_ar))>0), name_fr text, image_url text, image_path text, sort_order integer not null default 0);
create table if not exists public.store_products (id text primary key, category_id text references public.store_categories(id) on delete restrict, name_ar text not null check(length(trim(name_ar))>0), name_fr text, desc_ar text not null default '', desc_fr text, price numeric(12,2) not null check(price >= 0), tags text[] not null default '{}', image_url text, image_path text, sort_order integer not null default 0);
create table if not exists public.store_faqs (id uuid primary key default gen_random_uuid(), question_ar text not null, question_fr text, answer_ar text not null, answer_fr text, sort_order integer not null default 0);
create table if not exists public.order_attempts (id uuid primary key, created_at timestamptz not null default now(), mode text not null check(mode in ('direct','cart')));
create table if not exists public.order_attempt_items (attempt_id uuid not null references public.order_attempts(id) on delete cascade, product_id text references public.store_products(id) on delete set null, product_name text not null, quantity integer not null check(quantity between 1 and 99));
create index if not exists order_attempts_created_idx on public.order_attempts(created_at desc);
create index if not exists order_attempt_items_product_idx on public.order_attempt_items(product_id);
create or replace function public.is_store_admin() returns boolean language sql stable security definer set search_path = '' as $$select exists(select 1 from public.admin_users where user_id=auth.uid())$$;
revoke all on function public.is_store_admin() from public;
grant execute on function public.is_store_admin() to authenticated;
alter table public.admin_users enable row level security;
alter table public.store_settings enable row level security;
alter table public.store_socials enable row level security;
alter table public.store_categories enable row level security;
alter table public.store_products enable row level security;
alter table public.store_faqs enable row level security;
alter table public.order_attempts enable row level security;
alter table public.order_attempt_items enable row level security;
-- No direct access to admin_users or order logging tables (only RPC + admin SELECT).
create policy "admin view own role" on public.admin_users for select to authenticated using (user_id=auth.uid());
create policy "settings read" on public.store_settings for select to anon, authenticated using(true);
create policy "socials read" on public.store_socials for select to anon, authenticated using(true);
create policy "categories read" on public.store_categories for select to anon, authenticated using(true);
create policy "products read" on public.store_products for select to anon, authenticated using(true);
create policy "faq read" on public.store_faqs for select to anon, authenticated using(true);
create policy "settings admin update" on public.store_settings for update to authenticated using(public.is_store_admin()) with check(public.is_store_admin());
create policy "socials admin all" on public.store_socials for all to authenticated using(public.is_store_admin()) with check(public.is_store_admin());
create policy "categories admin all" on public.store_categories for all to authenticated using(public.is_store_admin()) with check(public.is_store_admin());
create policy "products admin all" on public.store_products for all to authenticated using(public.is_store_admin()) with check(public.is_store_admin());
create policy "faq admin all" on public.store_faqs for all to authenticated using(public.is_store_admin()) with check(public.is_store_admin());
create policy "attempt admin view" on public.order_attempts for select to authenticated using(public.is_store_admin());
create policy "attempt items admin view" on public.order_attempt_items for select to authenticated using(public.is_store_admin());
-- Anonymous purchase-intent events: constrained RPC, server-side idempotent event key, no direct INSERT rights.
create or replace function public.record_order_attempt(p_id uuid, p_mode text, p_items jsonb) returns void
language plpgsql security definer set search_path = '' as $$
declare it jsonb; n int; pid text; pname text; cnt int := 0;
begin
 if p_mode not in ('direct','cart') or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) < 1 or jsonb_array_length(p_items)>30 then raise exception 'Invalid request'; end if;
 if exists(select 1 from public.order_attempts where id=p_id) then return; end if;
 for it in select value from jsonb_array_elements(p_items) loop
   pid := it->>'id'; n := (it->>'qty')::integer;
   if n < 1 or n > 99 or not exists(select 1 from public.store_products where id=pid) then raise exception 'Invalid item'; end if;
   cnt := cnt + n; if cnt>100 then raise exception 'Too many items'; end if;
 end loop;
 insert into public.order_attempts(id,mode) values(p_id,p_mode);
 for it in select value from jsonb_array_elements(p_items) loop
   pid := it->>'id'; n := (it->>'qty')::integer;
   select coalesce(nullif(name_ar,''),id) into pname from public.store_products where id=pid;
   insert into public.order_attempt_items(attempt_id,product_id,product_name,quantity) values(p_id,pid,pname,n);
 end loop;
end $$;
revoke all on function public.record_order_attempt(uuid,text,jsonb) from public;
grant execute on function public.record_order_attempt(uuid,text,jsonb) to anon,authenticated;
-- Storage: public URLs for storefront images; only admins may upload/delete.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
 values ('store-images','store-images',true,5242880,array['image/webp','image/png','image/jpeg']) on conflict(id) do nothing;
create policy "public view storefront images" on storage.objects for select to anon,authenticated using(bucket_id='store-images');
create policy "admin upload storefront images" on storage.objects for insert to authenticated with check(bucket_id='store-images' and public.is_store_admin());
create policy "admin modify storefront images" on storage.objects for update to authenticated using(bucket_id='store-images' and public.is_store_admin()) with check(bucket_id='store-images' and public.is_store_admin());
create policy "admin delete storefront images" on storage.objects for delete to authenticated using(bucket_id='store-images' and public.is_store_admin());
