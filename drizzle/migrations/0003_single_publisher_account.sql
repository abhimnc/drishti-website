-- One publisher account (created by scripts/create-publisher.mjs), signed in with a username that maps to a non-deliverable .invalid address.
create or replace function public.assign_publisher_role() returns trigger language plpgsql security definer set search_path=public as $$ begin if lower(new.email)='drishtikalra@publisher.invalid' and new.email_confirmed_at is not null then insert into public.user_roles(user_id,role) values(new.id,'admin') on conflict do nothing; end if; return new; end $$;
revoke execute on function public.assign_publisher_role() from public,anon,authenticated;
--> statement-breakpoint
-- Refuse every other account, whether from email sign-up or OAuth.
create function public.restrict_to_publisher() returns trigger language plpgsql security definer set search_path=public as $$ begin if lower(coalesce(new.email,''))<>'drishtikalra@publisher.invalid' then raise exception 'Account creation is disabled'; end if; return new; end $$;
revoke execute on function public.restrict_to_publisher() from public,anon,authenticated;
create trigger restrict_to_publisher before insert or update of email on auth.users for each row execute function public.restrict_to_publisher();
--> statement-breakpoint
delete from public.user_roles where role='admin' and user_id not in (select id from auth.users where lower(email)='drishtikalra@publisher.invalid');
