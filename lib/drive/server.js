// Server-only Google Drive wrapper. Two auth modes:
//
//   - 'public'  → uses GOOGLE_DRIVE_API_KEY. Files in the folder must be
//                 shared as "anyone with the link" or the API returns 404.
//   - 'private' → uses GOOGLE_SERVICE_ACCOUNT_JSON. The service account
//                 must be invited as Viewer on the folder.
//
// Both modes return the same row shape so callers don't have to branch.

import { google } from 'googleapis';

const FOLDER_MIME = 'application/vnd.google-apps.folder';

// Lazy singletons — built on first use, kept across requests.
let cachedServiceDrive = null;
let cachedPublicDrive = null;

function getPublicDrive() {
  if (cachedPublicDrive) return cachedPublicDrive;
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  if (!apiKey) return null;
  cachedPublicDrive = google.drive({ version: 'v3', auth: apiKey });
  return cachedPublicDrive;
}

function getServiceDrive() {
  if (cachedServiceDrive) return cachedServiceDrive;
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  let credentials;
  try {
    credentials = JSON.parse(raw);
  } catch {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON.');
  }
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });
  cachedServiceDrive = google.drive({ version: 'v3', auth });
  return cachedServiceDrive;
}

function shapeRow(f) {
  const isFolder = f.mimeType === FOLDER_MIME;
  return {
    id: f.id,
    name: f.name,
    mimeType: f.mimeType,
    isFolder,
    size: f.size ? Number(f.size) : null,
    modifiedTime: f.modifiedTime ?? null,
    thumbnailLink: f.thumbnailLink ?? null,
    iconLink: f.iconLink ?? null,
    downloadUrl: isFolder ? null : downloadUrl(f.id),
    previewUrl: isFolder ? null : previewUrl(f.id),
    folderUrl: isFolder ? folderUrl(f.id) : null,
  };
}

export async function listFolder(folderId, { mode = 'private' } = {}) {
  if (!folderId) return { ok: false, error: 'No folder id', files: [] };

  const drive = mode === 'public' ? getPublicDrive() : getServiceDrive();
  if (!drive) {
    return {
      ok: false,
      error:
        mode === 'public'
          ? 'GOOGLE_DRIVE_API_KEY is not set — see DRIVE-SETUP.md.'
          : 'GOOGLE_SERVICE_ACCOUNT_JSON is not set — see DRIVE-SETUP.md.',
      files: [],
    };
  }

  try {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields:
        'files(id, name, mimeType, size, modifiedTime, thumbnailLink, iconLink)',
      pageSize: 1000,
      orderBy: 'folder,name',
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });
    const files = (res.data.files ?? []).map(shapeRow);
    return { ok: true, files };
  } catch (e) {
    return { ok: false, error: e?.message || 'Drive API error', files: [] };
  }
}

export async function getFolderMeta(folderId, { mode = 'private' } = {}) {
  if (!folderId) return null;
  const drive = mode === 'public' ? getPublicDrive() : getServiceDrive();
  if (!drive) return null;
  try {
    const res = await drive.files.get({
      fileId: folderId,
      fields: 'id, name, parents, mimeType',
      supportsAllDrives: true,
    });
    return res.data;
  } catch {
    return null;
  }
}

export function downloadUrl(fileId) {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

export function previewUrl(fileId) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function folderUrl(folderId) {
  return `https://drive.google.com/drive/folders/${folderId}`;
}

// Accepts a full Drive folder URL or a bare ID; returns the ID or null.
export function extractFolderId(input) {
  if (!input) return null;
  const trimmed = String(input).trim();
  if (!trimmed) return null;
  const match = trimmed.match(/folders\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  if (/^[a-zA-Z0-9_-]+$/.test(trimmed)) return trimmed;
  return null;
}
