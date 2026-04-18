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

      <div className="space-y-10">
        {/* Buttons */}
        <Block title="Buttons">
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex h-10 items-center rounded-lg bg-ink px-5 text-[14px] font-medium text-bg transition-opacity hover:opacity-90">
              Primary
            </button>
            <button className="inline-flex h-10 items-center rounded-lg border border-line bg-bg px-5 text-[14px] font-medium text-ink transition-colors hover:bg-surface">
              Secondary
            </button>
            <button className="inline-flex h-10 items-center rounded-lg bg-primary px-5 text-[14px] font-medium text-white transition-opacity hover:opacity-90">
              Accent
            </button>
            <button className="inline-flex h-10 items-center rounded-lg bg-accent/10 px-5 text-[14px] font-medium text-accent transition-colors hover:bg-accent/15">
              Destructive
            </button>
            <button className="inline-flex h-10 items-center rounded-lg px-5 text-[14px] font-medium text-muted transition-colors hover:text-ink">
              Ghost
            </button>
          </div>
        </Block>

        {/* Cards */}
        <Block title="Cards">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-line bg-bg p-6">
              <p className="font-mono text-[11px] font-medium text-primary">Feature</p>
              <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.015em] text-ink">Materials that last.</h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-muted">
                We source with patience. Shortcuts compound, and we&apos;d rather build once.
              </p>
            </div>
            <div className="rounded-xl border border-line bg-bg p-6">
              <p className="font-mono text-[11px] font-medium text-accent">Note</p>
              <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.015em] text-ink">Field report</h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-muted">
                After two years in salt air, the finish settles into a quieter green.
              </p>
            </div>
          </div>
        </Block>

        {/* Form */}
        <Block title="Form inputs">
          <form className="max-w-md space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-ink">
                Email
              </span>
              <input
                type="email"
                placeholder="you@oxydise.com"
                className="h-10 w-full rounded-lg border border-line bg-bg px-3 text-[14px] text-ink placeholder:text-muted/70 focus:border-primary focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[12px] font-medium text-ink">
                Message
              </span>
              <textarea
                rows={3}
                placeholder="Tell us what you're building…"
                className="w-full rounded-lg border border-line bg-bg px-3 py-2 text-[14px] text-ink placeholder:text-muted/70 focus:border-primary focus:outline-none"
              />
            </label>
            <button
              type="button"
              className="inline-flex h-10 items-center rounded-lg bg-ink px-5 text-[14px] font-medium text-bg transition-opacity hover:opacity-90"
            >
              Send
            </button>
          </form>
        </Block>

        {/* Badges */}
        <Block title="Badges">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[12px] font-medium text-primary">
              New
            </span>
            <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-[12px] font-medium text-accent">
              Live
            </span>
            <span className="inline-flex items-center rounded-full border border-line bg-panel px-2.5 py-0.5 text-[12px] font-medium text-muted">
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
      <h2 className="mb-4 text-[15px] font-semibold tracking-[-0.01em] text-ink">{title}</h2>
      <div className="rounded-xl border border-line bg-panel p-6 md:p-8">
        {children}
      </div>
    </section>
  );
}
