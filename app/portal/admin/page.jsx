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

  const { data: clients } = await supabase
    .from('client')
    .select('id, name, slug, is_internal, created_at')
    .order('is_internal', { ascending: false })
    .order('created_at', { ascending: false });

  const { data: files } = await supabase
    .from('file')
    .select('id, display_name, size_bytes, category, uploaded_at, client_id, client:client_id(name, is_internal)')
    .order('uploaded_at', { ascending: false });

  return <AdminPanel clients={clients ?? []} files={files ?? []} />;
}
