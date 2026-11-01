-- One publisher account, signed in with a username that maps to a non-deliverable .invalid address.
create or replace function public.assign_publisher_role() returns trigger language plpgsql security definer set search_path=public as $$ begin if lower(new.email)='drishtikalra@publisher.invalid' and new.email_confirmed_at is not null then insert into public.user_roles(user_id,role) values(new.id,'admin') on conflict do nothing; end if; return new; end $$;
revoke execute on function public.assign_publisher_role() from public,anon,authenticated;
--> statement-breakpoint
-- Refuse every other account, whether from email sign-up or OAuth.
create function public.restrict_to_publisher() returns trigger language plpgsql security definer set search_path=public as $$ begin if lower(coalesce(new.email,''))<>'drishtikalra@publisher.invalid' then raise exception 'Account creation is disabled'; end if; return new; end $$;
revoke execute on function public.restrict_to_publisher() from public,anon,authenticated;
create trigger restrict_to_publisher before insert or update of email on auth.users for each row execute function public.restrict_to_publisher();
--> statement-breakpoint
delete from public.user_roles where role='admin' and user_id not in (select id from auth.users where lower(email)='drishtikalra@publisher.invalid');
--> statement-breakpoint
insert into auth.users (instance_id,id,aud,role,email,encrypted_password,email_confirmed_at,raw_app_meta_data,raw_user_meta_data,created_at,updated_at,confirmation_token,recovery_token,email_change_token_new,email_change)
select '00000000-0000-0000-0000-000000000000','339c64b6-df95-4b60-9048-415f40f894c7','authenticated','authenticated','drishtikalra@publisher.invalid','$2a$10$QUMvXc.jM4QW3J4Ps2oSh.P4xj1bv12TsQOn98EIwYcc0JFQdwNj6',now(),'{"provider":"email","providers":["email"]}','{}',now(),now(),'','','',''
where not exists (select 1 from auth.users where lower(email)='drishtikalra@publisher.invalid');
--> statement-breakpoint
insert into auth.identities (id,user_id,provider_id,provider,identity_data,last_sign_in_at,created_at,updated_at)
select gen_random_uuid(),u.id,u.id::text,'email',jsonb_build_object('sub',u.id::text,'email',u.email,'email_verified',true),now(),now(),now()
from auth.users u where lower(u.email)='drishtikalra@publisher.invalid' and not exists (select 1 from auth.identities i where i.user_id=u.id and i.provider='email');
