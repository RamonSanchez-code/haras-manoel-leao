import manifest from '../data/images.manifest.json'

type Entry = { widths: number[]; width: number; height: number }
export const imageManifest = manifest as Record<string, Entry>

/** Monta o srcset a partir do manifesto gerado por `npm run images`. */
export function srcSetFor(src: string) {
  const entry = imageManifest[src]
  if (!entry || entry.widths.length < 2) return undefined
  const base = src.replace(/\.webp$/, '')
  return entry.widths.map((w) => `${w === entry.width ? src : `${base}-${w}.webp`} ${w}w`).join(', ')
}
