import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart, Trees, UtensilsCrossed } from 'lucide-react'
import { useRef } from 'react'
import { about } from '../data/site'
import { SHOW_PENDING } from '../lib/links'
import { HorseshoeIcon } from './ui/icons'
import { Photo } from './ui/Photo'
import { CurtainReveal, Reveal } from './ui/Reveal'

const icons = {
  trees: Trees,
  horseshoe: HorseshoeIcon,
  utensils: UtensilsCrossed,
  heart: Heart,
} as const

export function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [120, -100])
  const [img1, img2, img3] = about.images

  return (
    <section id="o-haras" ref={ref} className="relative overflow-hidden bg-sand-50 py-24 sm:py-36">
      {/* Marca d'água */}
      <HorseshoeIcon size={520} className="pointer-events-none absolute -top-24 -right-40 text-sand-200/70" strokeWidth={0.6} />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Composição de imagens assimétrica */}
        <div className="relative order-2 h-[520px] sm:h-[640px] lg:order-1 lg:col-span-6">
          <CurtainReveal className="absolute top-0 left-0 h-[78%] w-[66%] overflow-hidden rounded-[2rem] shadow-2xl shadow-forest-950/20">
            <Photo image={img1} className="h-full w-full" sizes="(min-width:1024px) 33vw, 66vw" />
          </CurtainReveal>
          <motion.div style={{ y: y1 }} className="absolute right-0 bottom-10 h-[46%] w-[48%]">
            <CurtainReveal delay={0.2} className="h-full w-full overflow-hidden rounded-[1.6rem] ring-8 ring-sand-50 shadow-xl">
              <Photo image={img2} className="h-full w-full" sizes="(min-width:1024px) 25vw, 48vw" />
            </CurtainReveal>
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute top-[8%] right-[6%] hidden h-[26%] w-[28%] sm:block">
            <CurtainReveal delay={0.35} className="h-full w-full overflow-hidden rounded-full ring-8 ring-sand-50 shadow-lg">
              <Photo image={img3} className="h-full w-full" sizes="20vw" />
            </CurtainReveal>
          </motion.div>
        </div>

        {/* Texto */}
        <div className="order-1 flex flex-col justify-center lg:order-2 lg:col-span-5 lg:col-start-8">
          <Reveal>
            <p className="eyebrow">{about.eyebrow}</p>
            <h2 className="mt-5 font-display text-[clamp(2.3rem,4.6vw,4rem)] leading-[1.02] font-medium text-forest-900">{about.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-forest-900/75">{about.lead}</p>
          </Reveal>

          {about.history ? (
            <Reveal delay={0.1}>
              <p className="mt-5 leading-relaxed text-forest-900/70">{about.history}</p>
            </Reveal>
          ) : (
            SHOW_PENDING && (
              <p className="mt-5 rounded-xl border border-dashed border-copper-500/40 bg-copper-400/5 px-4 py-3 text-sm text-copper-600">
                Espaço reservado para a história e a tradição do Haras — aguardando texto oficial (
                <code>about.history</code>).
              </p>
            )
          )}

          <ul className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {about.pillars.map((p, i) => {
              const Icon = icons[p.icon as keyof typeof icons]
              return (
                <Reveal as="li" key={p.title} delay={0.08 * i} y={20} className="group">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-900 text-copper-300 transition-transform duration-700 ease-cinema group-hover:-translate-y-1 group-hover:rotate-[-8deg]">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-4 font-display text-2xl font-semibold text-forest-900">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-forest-900/65">{p.text}</p>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
