/**
 * Converte as fotos de /assets-src em WebP responsivo dentro de /public/images
 * e gera src/data/images.manifest.json (larguras disponíveis + dimensões),
 * usado pelo componente <Photo> para montar o srcset automaticamente.
 *
 * Uso: npm run images
 * Pastas que começam com "_" são ignoradas (ex.: fotos aguardando autorização).
 */
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import { extname, join, relative, sep } from 'node:path'
import sharp from 'sharp'

const ROOT = import.meta.dirname ? join(import.meta.dirname, '..') : process.cwd()
const SRC = join(ROOT, 'assets-src')
const OUT = join(ROOT, 'public', 'images')
const MANIFEST = join(ROOT, 'src', 'data', 'images.manifest.json')
const WIDTHS = [640, 1280, 2000]
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff'])

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else if (EXT.has(extname(entry.name).toLowerCase())) yield full
  }
}

const manifest = {}
for await (const file of walk(SRC)) {
  const rel = relative(SRC, file).split(sep).join('/').replace(/\.[^.]+$/, '')
  const meta = await sharp(file).metadata()
  const widths = WIDTHS.filter((w) => w < meta.width).concat(Math.min(meta.width, WIDTHS.at(-1)))
  const unique = [...new Set(widths)].sort((a, b) => a - b)
  await mkdir(join(OUT, rel, '..'), { recursive: true })
  for (const w of unique) {
    const isMax = w === unique.at(-1)
    const name = isMax ? `${rel}.webp` : `${rel}-${w}.webp`
    await sharp(file).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: 78, effort: 5 }).toFile(join(OUT, name))
  }
  const max = unique.at(-1)
  manifest[`/images/${rel}.webp`] = {
    widths: unique,
    width: max,
    height: Math.round((meta.height / meta.width) * max),
  }
  console.log(`✓ ${rel}  (${unique.join(', ')}px)`)
}
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
console.log(`\nManifesto: ${relative(ROOT, MANIFEST)} — ${Object.keys(manifest).length} imagens`)
