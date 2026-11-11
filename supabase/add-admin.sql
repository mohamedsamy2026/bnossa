-- FIRST create an email/password user in Authentication > Users > Add user.
-- Copy their UUID (not their email) and replace the placeholder below.
insert into public.admin_users(user_id)
values ('REPLACE_WITH_AUTH_USER_UUID'::uuid)
on conflict(user_id) do nothing;
-- Only SQL editor / service-role owner should grant roles. Never let the web app execute this.
