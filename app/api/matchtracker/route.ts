const STYLE = `
<base href="https://googstreams.com/">
<style>
  html, body { background: transparent; overflow: hidden; }
  .sr-widget { filter: invert(0.92) hue-rotate(180deg); }
  .sr-widget .srm-isLmt { filter: invert(1) hue-rotate(180deg); }
</style>`

export async function GET() {
  const res = await fetch('https://googstreams.com/matchtracker.html', {
    next: { revalidate: 3600 },
  })
  const html = await res.text()
  return new Response(html.replace('</head>', `${STYLE}</head>`), {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}
