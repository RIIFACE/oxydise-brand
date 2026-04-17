import SectionHeader from '@/components/SectionHeader';
import { brand } from '@/lib/brand.config';

export const metadata = { title: `Components — ${brand.name}` };

export default function ComponentsPage() {
  return (
    <>
      <SectionHeader
        eyebrow="05 Components"
        title="Building blocks."
        description="A minimal set of UI primitives rendered in brand."
      />

      <section className="mx-auto max-w-6xl space-y-12 px-6 pb-24">
        {/* Buttons */}
        <Block title="Buttons">
          <div className="flex flex-wrap gap-3">
            <button className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-bg hover:bg-primary/90">
              Primary
            </button>
            <button className="rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium text-text hover:border-primary">
              Secondary
            </button>
            <button className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-text hover:bg-accent/90">
              Destructive
            </button>
            <button className="rounded-md px-5 py-2.5 text-sm font-medium text-muted hover:text-text">
              Ghost
            </button>
          </div>
        </Block>

        {/* Cards */}
        <Block title="Cards">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-surface p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-primary">Feature</p>
              <h3 className="mt-3 font-display text-2xl">Materials that last.</h3>
              <p className="mt-2 text-sm text-muted">
                We source with patience. Shortcuts compound, and we'd rather build once.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-accent">Note</p>
              <h3 className="mt-3 font-display text-2xl">Field report</h3>
              <p className="mt-2 text-sm text-muted">
                After two years in salt air, the finish settles into a quieter green.
              </p>
            </div>
          </div>
        </Block>

        {/* Form */}
        <Block title="Form inputs">
          <form className="max-w-md space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted">
                Email
              </span>
              <input
                type="email"
                placeholder="you@oxydise.com"
                className="w-full rounded-md border border-border bg-bg px-3 py-2 text-text placeholder:text-muted/60 focus:border-primary focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted">
                Message
              </span>
              <textarea
                rows={3}
                placeholder="Tell us what you're building…"
                className="w-full rounded-md border border-border bg-bg px-3 py-2 text-text placeholder:text-muted/60 focus:border-primary focus:outline-none"
              />
            </label>
            <button
              type="button"
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-bg hover:bg-primary/90"
            >
              Send
            </button>
          </form>
        </Block>

        {/* Badges */}
        <Block title="Badges">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              New
            </span>
            <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              Live
            </span>
            <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
              Draft
            </span>
          </div>
        </Block>
      </section>
    </>
  );
}

function Block({ title, children }) {
  return (
    <section>
      <h2 className="mb-5 font-display text-2xl">{title}</h2>
      <div className="rounded-xl border border-border bg-surface/40 p-6 md:p-8">
        {children}
      </div>
    </section>
  );
}
