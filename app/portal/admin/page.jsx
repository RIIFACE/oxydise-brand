import { redirect } from 'next/navigation';
import { getSupabaseServerClient } from '@/lib/supabase/server';
import AdminPanel from './AdminPanel';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const supabase = getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/portal/login');

  const { data: adminRows } = await supabase
    .from('client_member')
    .select('role')
    .eq('user_id', user.id)
    .eq('role', 'admin')
    .limit(1);
  if ((adminRows?.length ?? 0) === 0) redirect('/portal');

  const { data: files } = await supabase
    .from('file')
    .select('id, display_name, size_bytes, mime_type, category, uploaded_at, client_id, client:client_id(name, slug, is_internal)')
    .order('uploaded_at', { ascending: false });

  return <AdminPanel files={files ?? []} />;
}
