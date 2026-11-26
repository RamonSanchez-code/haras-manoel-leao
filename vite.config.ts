import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'

/**
 * Gera robots.txt e sitemap.xml no build usando VITE_SITE_URL (.env).
 * Assim o domínio fica configurável em um único lugar.
 */
function seoFiles(siteUrl: string): Plugin {
  const base = siteUrl.replace(/\/+$/, '')
  const today = new Date().toISOString().slice(0, 10)
  return {
    name: 'haras-seo-files',
    apply: 'build',
    generateBundle() {
      if (base.includes('SEU-DOMINIO')) {
        this.warn('VITE_SITE_URL ainda não foi configurada no arquivo .env — sitemap e canonical usam um domínio provisório.')
      }
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`,
      })
      const urls = [
        { loc: `${base}/`, priority: '1.0' },
        { loc: `${base}/privacidade/`, priority: '0.3' },
      ]
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          urls
            .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod><priority>${u.priority}</priority></url>`)
            .join('\n') +
          `\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), seoFiles(env.VITE_SITE_URL ?? '')],
    build: {
      rollupOptions: {
        input: {
          main: resolve(import.meta.dirname, 'index.html'),
          privacidade: resolve(import.meta.dirname, 'privacidade/index.html'),
        },
      },
    },
  }
})
