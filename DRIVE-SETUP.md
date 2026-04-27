# Drive setup — one-time

The brand portal lists files from Google Drive. The portal looks at
**three folders** total — one per audience — set via env vars.

## 1. Google Cloud project + APIs

1. Go to <https://console.cloud.google.com> and create (or pick) a
   project. Suggested name: **Oxydise Portal**.
2. **APIs & Services → Library**, search **Google Drive API**, click
   **Enable**.

## 2. API key (for the public folder)

The public `/downloads` folder is read using a simple API key, since
its files are shared "anyone with the link".

1. **APIs & Services → Credentials → Create credentials → API key**.
2. Click the new key → **Edit**:
   - **API restrictions** → Restrict key → check **Google Drive API**.
3. Copy the key value.

## 3. Service account (for private folders)

The Internal and Clients folders stay private (not "anyone with link").
A service account reads them on the portal's behalf.

1. **APIs & Services → Credentials → Create credentials →
   Service account**. Name it `oxydise-portal-reader`. Skip role
   assignment.
2. Open the service account → **Keys → Add key → Create new key →
   JSON**. A `.json` file downloads.
3. Copy the **service account email** (looks like
   `oxydise-portal-reader@<project>.iam.gserviceaccount.com`) — you'll
   need it for sharing in step 4.

## 4. Drive folder layout

In your Google Drive, create three folders:

```
📁 Oxydise — Public      (sharing: "Anyone with the link" → Viewer)
📁 Oxydise — Internal    (sharing: service account email → Viewer)
📁 Oxydise — Clients     (sharing: service account email → Viewer)
```

Inside each folder, you can build whatever subfolder structure you
want (`Logos/`, `Photos/Jul 2025/`, `Brochures/`, etc.) — the portal
mirrors the tree as you navigate.

> Subfolders inherit sharing from their parent. Sharing the top-level
> folder once covers everything inside.

## 5. Env vars

A folder ID is the alphanumeric chunk in its URL:

```
https://drive.google.com/drive/folders/1aBcDeFgHiJkLmNoPqRsTuVwXyZ
                                        ^^^^^^^^^^^^^^^^^^^^^^^^^^
                                        this part
```

Set five env vars on Vercel and in `.env.local`:

```
GOOGLE_DRIVE_API_KEY=...
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}

GOOGLE_DRIVE_FOLDER_PUBLIC=...
GOOGLE_DRIVE_FOLDER_INTERNAL=...
GOOGLE_DRIVE_FOLDER_CLIENTS=...
```

Paste the **entire contents** of the service account JSON file as a
single env var value (Vercel handles the embedded quotes / newlines
fine; locally use a single-quoted string in `.env.local`).

## Verification

- **Public path** — drop a JPG into `Oxydise — Public`, refresh
  `/downloads` → image thumbnail appears, **Download** button works.
- **Private path** — drop a file into `Oxydise — Internal`, sign in to
  `/portal` as an admin → file appears in the Internal section.
- **Per-client path** — drop a file into `Oxydise — Clients`, sign in
  as any client → file appears in their dashboard.

## Troubleshooting

| Symptom | Cause |
|---|---|
| "GOOGLE_DRIVE_API_KEY is not set" | Step 2 not done, or env var typo |
| "GOOGLE_SERVICE_ACCOUNT_JSON is not set" | Step 3 not done, or value isn't a single line |
| Folder shows empty in the portal but has files in Drive | Service account isn't shared on that folder — re-check step 4 |
| "File not found" on a public file | Public folder isn't shared "anyone with link" — toggle sharing in Drive |
