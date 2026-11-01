-- Private bucket for publication images; read access comes from the storage.objects policies in 0000.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types) values ('publication-media','publication-media',false,10485760,array['image/jpeg','image/png','image/webp']) on conflict (id) do nothing;
