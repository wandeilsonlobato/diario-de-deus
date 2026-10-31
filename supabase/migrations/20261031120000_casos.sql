-- Casos salvos na nuvem. Cada pessoa só enxerga e altera os próprios casos.
create table public.casos (
	user_id    uuid   not null default auth.uid() references auth.users (id) on delete cascade,
	id         text   not null,
	title      text   not null default '',
	text       text   not null default '',
	style      text   not null default '',
	snippets   text   not null default '',
	meta       jsonb  not null default '{}',
	updated_at bigint not null,
	primary key (user_id, id),
	constraint casos_id_tamanho check (char_length(id) <= 100),
	constraint casos_conteudo_tamanho check (char_length(text) + char_length(style) + char_length(snippets) <= 2000000)
);

alter table public.casos enable row level security;

create policy "ler os próprios casos" on public.casos
	for select to authenticated using ((select auth.uid()) = user_id);

create policy "criar os próprios casos" on public.casos
	for insert to authenticated with check ((select auth.uid()) = user_id);

create policy "alterar os próprios casos" on public.casos
	for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

create policy "apagar os próprios casos" on public.casos
	for delete to authenticated using ((select auth.uid()) = user_id);

revoke all on public.casos from anon;
grant select, insert, update, delete on public.casos to authenticated;

-- Limite por pessoa, porque a chave pública do site permite escrever no banco
create function public.limitar_casos() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
	if (select count(*) from public.casos where user_id = new.user_id) >= 200 then
		raise exception 'limite de 200 casos atingido';
	end if;
	return new;
end;
$$;

revoke all on function public.limitar_casos() from public, anon, authenticated;

create trigger limitar_casos before insert on public.casos
	for each row execute function public.limitar_casos();
