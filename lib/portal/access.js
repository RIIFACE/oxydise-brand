// Domains that are auto-allowed at login and auto-granted internal-team
// membership on first sign-in. Add to this list to onboard a new
// Oxydise-owned domain — kept in code rather than the DB because it's
// part of the security model and shouldn't be editable from the admin UI.

export const OXYDISE_DOMAINS = [
  'oxydise.co.uk',
  'oxydisewellness.co.uk',
];

export function normaliseEmail(raw) {
  return String(raw ?? '').trim().toLowerCase();
}

export function isOxydiseDomain(email) {
  const e = normaliseEmail(email);
  if (!e) return false;
  const at = e.lastIndexOf('@');
  if (at < 0) return false;
  return OXYDISE_DOMAINS.includes(e.slice(at + 1));
}
