import { motion } from 'framer-motion'
import { Heart, Play } from 'lucide-react'
import { contact, instagramPosts } from '../data/site'
import { InstagramIcon } from './ui/icons'
import { Photo } from './ui/Photo'
import { Reveal } from './ui/Reveal'

export function InstagramSection() {
  return (
    <section id="instagram" className="relative bg-sand-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow">Nossa comunidade</p>
            <h2 className="mt-5 font-display text-[clamp(2.3rem,4.6vw,4rem)] leading-[1.02] font-medium text-forest-900">
              O dia a dia do Haras no <em className="text-copper-500">Instagram</em>
            </h2>
            <a
              href={contact.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-lg font-semibold text-forest-900 underline decoration-copper-400 decoration-2 underline-offset-4 hover:text-copper-600"
            >
              {contact.instagram.handle}
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={contact.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn relative bg-[linear-gradient(115deg,#f9ce34,#ee2a7b_45%,#6228d7)] text-white shadow-lg shadow-[#ee2a7b]/30 hover:brightness-110"
            >
              <InstagramIcon size={18} /> Acompanhe nossas novidades
            </a>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
          {instagramPosts.map((post, i) => (
            <motion.li
              key={post.url}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
            >
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-xl"
                aria-label={`Abrir no Instagram: ${post.image.alt}`}
              >
                <Photo image={post.image} className="h-full w-full transition-transform duration-1000 ease-cinema group-hover:scale-110" sizes="(min-width:1024px) 16vw, 50vw" />
                {post.isVideo && (
                  <span className="absolute top-2.5 right-2.5 text-white drop-shadow" aria-label="Vídeo">
                    <Play size={16} fill="currentColor" />
                  </span>
                )}
                <span className="absolute inset-0 flex items-center justify-center gap-2 bg-forest-950/55 text-sm font-semibold text-white opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Heart size={18} aria-hidden /> Ver publicação
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
