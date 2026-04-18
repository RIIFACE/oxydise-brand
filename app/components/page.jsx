import SectionHeader from '@/components/SectionHeader';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Components — ${brand.name}` };

export default function ComponentsPage() {
  return (
    <>
      <SectionHeader
        eyebrow="Components"
        title="Building blocks."
        description="A minimal set of UI primitives rendered in brand."
      />

      <div className="space-y-16 pb-24 md:pb-32">
        <Block title="Buttons">
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex h-11 items-center rounded-full bg-ink px-6 text-[16px] font-medium text-bg transition-opacity hover:opacity-90">
              Primary
            </button>
            <button className="inline-flex h-11 items-center rounded-full bg-panel px-6 text-[16px] font-medium text-ink transition-colors hover:bg-surface">
              Secondary
            </button>
            <button className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-[16px] font-medium text-white transition-opacity hover:opacity-90">
              Accent
            </button>
            <button
              className="inline-flex h-11 items-center rounded-full bg-transparent px-6 text-[16px] font-medium text-ink transition-colors hover:bg-ink hover:text-bg"
              style={{ border: '1.5px solid currentColor' }}
            >
              Outlined
            </button>
          </div>
        </Block>

        <Block title="Cards">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-[20px] bg-bg p-6">
              <p className="text-[16px] font-medium text-primary">Feature</p>
              <h3 className="mt-3 font-display text-[22px] font-medium tracking-[-0.015em] text-ink">Materials that last.</h3>
              <p className="mt-2 text-[16px] leading-[1.55] text-muted">
                We source with patience. Shortcuts compound, and we&apos;d rather build once.
              </p>
            </div>
            <div className="rounded-[20px] bg-bg p-6">
              <p className="text-[16px] font-medium text-accent">Note</p>
              <h3 className="mt-3 font-display text-[22px] font-medium tracking-[-0.015em] text-ink">Field report</h3>
              <p className="mt-2 text-[16px] leading-[1.55] text-muted">
                After two years in salt air, the finish settles into a quieter green.
              </p>
            </div>
          </div>
        </Block>

        <Block title="Form inputs">
          <form className="max-w-md space-y-4">
            <label className="block">
              <span className="mb-2 block text-[16px] font-medium text-ink">
                Email
              </span>
              <input
                type="email"
                placeholder="you@oxydise.com"
                className="h-11 w-full rounded-lg border border-line bg-bg px-3 text-[16px] text-ink placeholder:text-muted/70 focus:border-primary focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-[16px] font-medium text-ink">
                Message
              </span>
              <textarea
                rows={3}
                placeholder="Tell us what you're building…"
                className="w-full rounded-lg border border-line bg-bg px-3 py-2 text-[16px] text-ink placeholder:text-muted/70 focus:border-primary focus:outline-none"
              />
            </label>
            <button
              type="button"
              className="inline-flex h-11 items-center rounded-lg bg-ink px-5 text-[16px] font-medium text-bg transition-opacity hover:opacity-90"
            >
              Send
            </button>
          </form>
        </Block>

        <Block title="Badges">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[16px] font-medium text-primary">
              New
            </span>
            <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-[16px] font-medium text-accent">
              Live
            </span>
            <span className="inline-flex items-center rounded-full border border-line bg-panel px-3 py-1 text-[16px] font-medium text-muted">
              Draft
            </span>
          </div>
        </Block>
      </div>
    </>
  );
}

function Block({ title, children }) {
  return (
    <section>
      <h2 className="mb-4 font-display text-[18px] font-medium tracking-[-0.01em] text-ink">{title}</h2>
      <div className="rounded-[20px] bg-panel p-6 md:p-8">
        {children}
      </div>
    </section>
  );
}
