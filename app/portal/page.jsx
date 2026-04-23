import { getSupabaseServerClient, getSupabaseAdminClient } from '@/lib/supabase/server';
import DashboardClient from './_components/DashboardClient';

export const dynamic = 'force-dynamic';

const BUCKET = 'client-files';
const PREVIEW_TTL_SECONDS = 60 * 60;

function isPreviewable(mime) {
  if (!mime) return false;
  return mime.startsWith('image/') || mime.startsWith('video/');
}

export default async function PortalDashboard() {
  const supabase = getSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: adminRows } = await supabase
    .from('client_member')
    .select('role')
    .eq('user_id', user.id)
    .eq('role', 'admin')
    .limit(1);
  const isAdmin = (adminRows?.length ?? 0) > 0;

  const { data: files } = await supabase
    .from('file')
    .select('id, display_name, size_bytes, mime_type, category, storage_path, uploaded_at, client_id, client:client_id(name, slug, is_internal)')
    .order('uploaded_at', { ascending: false });

  // Brand downloads have their own home at /downloads — keep them out of
  // the portal dashboard.
  const rows = (files ?? []).filter((f) => f.client?.slug !== 'brand-downloads');
  const previewPaths = rows.filter((f) => isPreviewable(f.mime_type)).map((f) => f.storage_path);

  let previewByPath = new Map();
  if (previewPaths.length) {
    const admin = getSupabaseAdminClient();
    const { data: signed } = await admin.storage.from(BUCKET).createSignedUrls(previewPaths, PREVIEW_TTL_SECONDS);
    previewByPath = new Map((signed ?? []).map((s) => [s.path, s.signedUrl]));
  }

  const enriched = rows.map((f) => ({
    id: f.id,
    display_name: f.display_name,
    size_bytes: f.size_bytes,
    mime_type: f.mime_type,
    category: f.category,
    uploaded_at: f.uploaded_at,
    client: f.client,
    preview_url: previewByPath.get(f.storage_path) ?? null,
  }));

  return <DashboardClient files={enriched} isAdmin={isAdmin} />;
}
