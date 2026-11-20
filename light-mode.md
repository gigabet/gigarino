# Light mode proof of concept: notes for the two-theme rework

Status: frozen rough PoC on a separate branch. Not meant to ship. Written 2026-11-21.

## What the PoC does

- Theme switching via `next-themes` with `attribute='data-theme'`, dark default, `enableSystem={false}`. The light block is `:root[data-theme='light']` in `app/globals.css`. Dark stays the plain `:root`, so the 30 inert `dark:` variants in `components/ui` stay inert. A `light:` custom variant exists for one-off overrides.
- Dark values were kept identical wherever possible. New tokens: `--surface*` (replaces the static `dark-*` scale), `--inset`, `--brand`, `--glow-y`/`--glow-color`, `--primary-hover`, `--sport-*`.
- Codemod (~70 files): `bg|border|text-white/N` -> `foreground/N` (identical in dark, flips in light), `bg-dark-*` -> `surface-*`, gray/neutral text -> tokens, `text-primary` -> `text-brand`, selective `text-white` -> `text-foreground`.
- Palette remap in the light block (`--color-red-400` -> red-700, etc.) fixes pastel status text without touching call sites.
- No theme toggle UI was built. Switch with `localStorage.setItem('theme','light')`.

## Lessons

- After changing `globals.css`, Next did not recompile the CSS until `.next` was deleted. Check this first if a theme "does nothing".
- Verify Tailwind output by compiling the real `globals.css` with the JS API (`compile()` from `tailwindcss`) against every class string in the repo. Split candidates on whitespace and quotes only, not on `=`, or `data-[state=on]` variants are silently dropped.
- `shadow-glow*` inlines its geometry into the utility, so a variable override does nothing. Put `var()`s inside the `--shadow-*` theme value instead.
- Alpha compositing for contrast maths must happen in gamma-encoded sRGB, not linear light.
- The default button's disabled style (`bg-muted-foreground text-muted`) is an inversion that is fine in dark and heavy in light. Skeletons use the same trick.
- `bg-black/N` is used both for modal scrims (fine in both themes) and for input wells (needs a light equivalent). Audit each site.
- Hard-coded colours in JS (`lib/sport-theme.ts`) and inline rgba gradients are invisible to class codemods.

## Open design questions for the rework

- Brand colour: lime (`oklch(91.2% 0.17 121.3)`) is about 1.2:1 on white, so it can only be a fill in light. Two options were tried or considered: a same-hue olive for text (`oklch(51% 0.12 121.3)`, about 5:1), or lime as fills only with neutral text. This is the main thing that made the PoC feel inconsistent.
- Muted/disabled text is a tension: 57% lightness reads as muted but is about 4.1:1 on grey surfaces (50% passes AA but looks like normal text). Consider separate `--muted-foreground` and `--disabled` tokens.
- Hover direction: lighter in dark, darker in light. Tinted lime hovers were replaced with neutral darkening in light.
- Glows: neon halos in dark, soft neutral elevation in light.

## Known gaps

- No toggle UI.
- Focus borders (`focus:border-primary/40`) are nearly invisible on white.
- Casino hero banner, carousel radial gradients, provider-section hover shadow, particle canvas and the root background layer are untouched.
- `prettier-plugin-tailwindcss` class sorting and `biome check` import order were not run.
