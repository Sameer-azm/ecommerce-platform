const values = [
  {
    label: 'Materials',
    title: 'Nothing fancy. Just good cloth.',
    copy: 'We choose linen, cotton, and wool for the way they soften, breathe, and get better with time.',
  },
  {
    label: 'Making',
    title: 'Small batches, close attention.',
    copy: 'Our pieces are cut and finished in small runs, so the person making them can notice the little things.',
  },
  {
    label: 'Wearing',
    title: 'Made for repeat appearances.',
    copy: 'These are clothes for ordinary Tuesdays, long dinners, and the years in between. Nothing disposable here.',
  },
]

export default function About() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between border-b border-border px-6 py-5 lg:px-10">
        <a href="#top" className="font-serif text-xl tracking-[-0.04em]">FIELD / NOTE</a>
      </header>

      <section id="top" className="mx-auto grid max-w-7xl gap-10 px-6 pb-24 pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:px-10 lg:pt-24">
        <div className="max-w-xl">
          <p className="mb-8 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">A little about us · est. 2018</p>
          <h1 className="max-w-lg font-serif text-6xl leading-[0.92] tracking-[-0.06em] sm:text-8xl">Clothes with a point of view.</h1>
          <p className="mt-10 max-w-sm text-base leading-7 text-muted-foreground">We make everyday clothing slowly, in small quantities, for people who care how things are made.</p>
        </div>
        <div className="relative lg:translate-y-8">
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=85&w=1400&auto=format&fit=crop" alt="Natural fabric and clothing in a quiet studio" className="aspect-[4/3] w-full object-cover" />
        </div>
      </section>

      <section id="story" className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-28">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">The short version</p>
            <h2 className="mt-5 max-w-sm font-serif text-4xl leading-tight tracking-[-0.05em] sm:text-5xl">It started with a table, a window, and too many fabric swatches.</h2>
          </div>
          <div className="max-w-2xl space-y-6 text-lg leading-8 text-muted-foreground">
            <p>Field / Note began in a small studio with a simple frustration: why did well-made clothes feel so difficult to find? We wanted useful pieces with a little character, made by people we could actually name.</p>
            <p>That is still the brief. We work with a handful of mills and makers, keep our collections intentionally small, and leave room for the odd imperfect detail that proves a human was here.</p>
            <p className="font-serif text-2xl leading-snug text-foreground">“The best things in a wardrobe are usually the ones you reach for without thinking.”</p>
          </div>
        </div>
      </section>

      <section id="values" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <div className="mb-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <h2 className="font-serif text-5xl tracking-[-0.06em] sm:text-7xl">Our way of doing things.</h2>
          <p className="max-w-xs text-sm leading-6 text-muted-foreground">Less noise. Better materials. A little more time spent on the parts you notice later.</p>
        </div>
        <div className="grid gap-0 border-t border-border md:grid-cols-3">
          {values.map((value) => (
            <article key={value.label} className="border-b border-border py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">{value.label}</p>
              <h3 className="mt-12 max-w-[15rem] font-serif text-3xl leading-tight tracking-[-0.04em]">{value.title}</h3>
              <p className="mt-5 max-w-xs text-sm leading-6 text-muted-foreground">{value.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-6 mb-8 grid max-w-7xl gap-8 bg-primary px-6 py-12 text-primary-foreground sm:px-10 lg:mx-auto lg:grid-cols-[1fr_0.7fr] lg:items-end lg:px-14 lg:py-16">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground/60">Come by sometime</p>
          <h2 className="mt-6 max-w-xl font-serif text-5xl leading-[0.95] tracking-[-0.06em] sm:text-7xl">See what we are making next.</h2>
        </div>
        <div className="lg:justify-self-end">
          <p className="max-w-xs text-sm leading-6 text-primary-foreground/70">New pieces arrive in small batches. No countdown clocks, no endless drops.</p>
          <a href="/collection" className="mt-8 inline-block border-b border-primary-foreground pb-2 font-mono text-[11px] uppercase tracking-[0.15em]">Visit the collection ↗</a>
        </div>
      </section>
    </main>
  )
}