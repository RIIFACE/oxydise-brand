export const CATEGORIES = [
  { value: 'logo', label: 'Logos' },
  { value: 'brochure', label: 'Brochures' },
  { value: 'pdf', label: 'PDFs' },
  { value: 'font', label: 'Fonts' },
  { value: 'photo', label: 'Photos' },
  { value: 'video', label: 'Videos' },
  { value: 'social_template', label: 'Social templates' },
  { value: 'other', label: 'Other' },
];

const LABEL_BY_VALUE = new Map(CATEGORIES.map((c) => [c.value, c.label]));

export function categoryLabel(value) {
  return LABEL_BY_VALUE.get(value) ?? 'Other';
}

// Returns [{ value, label, files }] in CATEGORIES order, omitting empty groups.
export function groupByCategory(files) {
  const buckets = new Map(CATEGORIES.map((c) => [c.value, []]));
  for (const f of files ?? []) {
    const key = buckets.has(f.category) ? f.category : 'other';
    buckets.get(key).push(f);
  }
  return CATEGORIES
    .map((c) => ({ value: c.value, label: c.label, files: buckets.get(c.value) }))
    .filter((g) => g.files.length > 0);
}
