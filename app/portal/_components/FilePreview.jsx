'use client';

export default function FilePreview({ file }) {
  const { preview_url, mime_type, display_name, category } = file;

  if (preview_url && mime_type?.startsWith('image/')) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={preview_url}
        alt={display_name}
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
    );
  }

  if (preview_url && mime_type?.startsWith('video/')) {
    return (
      <video
        src={preview_url}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        preload="metadata"
      />
    );
  }

  return <FileGlyph category={category} filename={display_name} />;
}

function FileGlyph({ category, filename }) {
  const ext = (filename.split('.').pop() || '').toUpperCase().slice(0, 4);
  const tint = tintFor(category);
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: tint.bg }}>
      <span
        className="font-display text-[22px] font-medium tracking-[-0.02em] md:text-[28px]"
        style={{ color: tint.fg }}
      >
        {ext || '—'}
      </span>
    </div>
  );
}

function tintFor(category) {
  switch (category) {
    case 'logo':            return { bg: 'rgba(0, 21, 64, 0.06)',  fg: '#001540' };
    case 'pdf':             return { bg: 'rgba(229, 72, 77, 0.12)', fg: '#C43B3F' };
    case 'brochure':        return { bg: 'rgba(0, 21, 64, 0.08)',  fg: '#001540' };
    case 'font':            return { bg: 'rgba(0, 21, 64, 0.08)',  fg: '#001540' };
    case 'photo':           return { bg: 'rgba(0, 170, 255, 0.1)', fg: '#00AAFF' };
    case 'video':           return { bg: 'rgba(0, 21, 64, 0.08)',  fg: '#001540' };
    case 'social_template': return { bg: 'rgba(0, 170, 255, 0.1)', fg: '#00AAFF' };
    default:                return { bg: 'rgb(245 245 247)',       fg: 'rgb(110 110 115)' };
  }
}
