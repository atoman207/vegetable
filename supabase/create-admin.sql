-- =============================================================
-- W·H Inc. — Bootstrap the single admin account
-- Run this AFTER schema.sql. Paste into the Supabase SQL editor.
--
-- Creates (or upserts):
--   email:    admin@gmail.com      (stored lowercase by Supabase)
--   password: Admin@gmail.com
--   public.admins row linked to the new auth user
-- =============================================================

do $$
declare
  v_email    text := 'admin@gmail.com';
  v_password text := 'Admin@gmail.com';
  v_user_id  uuid;
begin
  -- If the user already exists, reuse that id; otherwise create it.
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
    -- User exists: reset the password + ensure the email is confirmed.
    update auth.users
    set encrypted_password   = crypt(v_password, gen_salt('bf')),
        email_confirmed_at   = coalesce(email_confirmed_at, now()),
        updated_at           = now()
    where id = v_user_id;
  end if;

  -- Upsert the admins row so this account is the sole admin.
  insert into public.admins (user_id, email)
  values (v_user_id, v_email)
  on conflict (user_id) do update set email = excluded.email;
end
$$;

-- (Optional) lock the site down to *only* this admin:
-- If you want to make absolutely sure no other user ever has admin
-- rights, uncomment the next two lines to delete every other admin row:
--
-- delete from public.admins
-- where email <> 'admin@gmail.com';
