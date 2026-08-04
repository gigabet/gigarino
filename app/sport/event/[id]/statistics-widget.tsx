/**
 * Reserved slot for the third-party (or in-house) match-statistics widget —
 * e.g. an iframe embed, live shot map, or possession chart. Wired up to real
 * data separately; this just holds the layout so the page doesn't shift once
 * it lands.
 */
export default function StatisticsWidget() {
  return (
    <section className='flex h-48 items-center justify-center rounded-2xl border border-white/5 bg-black/20 text-sm text-white/30 sm:h-60'>
      statistics widget
    </section>
  )
}
