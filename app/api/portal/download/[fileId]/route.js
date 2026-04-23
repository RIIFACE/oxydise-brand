import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const { fileId } = params;
  const supabase = getSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });
  }

  // RLS handles permission: only files the user can see come back.
  const { data: file, error } = await supabase
    .from('file')
    .select('id, storage_path, display_name, bucket')
    .eq('id', fileId)
    .maybeSingle();

  if (error || !file) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const { data: signed, error: signErr } = await supabase.storage
    .from(file.bucket || 'client-files')
    .createSignedUrl(file.storage_path, 60, { download: file.display_name });

  if (signErr || !signed?.signedUrl) {
    return NextResponse.json({ error: 'Could not sign URL' }, { status: 500 });
  }

  return NextResponse.redirect(signed.signedUrl);
}
