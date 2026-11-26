import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useRef } from 'react'
import { family } from '../data/site'
import { goToContact, SHOW_PENDING } from '../lib/links'
import { StatusTag } from './ui/Pending'
import { Photo } from './ui/Photo'
import { CurtainReveal, Reveal } from './ui/Reveal'

export function FamilyExperience() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [90, -90])
  const rotate = useTransform(scrollYProgress, [0, 1], [-4, 3])
  const moments = family.moments.filter((m) => m.status === 'confirmado' || SHOW_PENDING)

  return (
    <section id="familia" ref={ref} className="relative overflow-hidden bg-sand-50 py-24 sm:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <div className="relative h-[520px] sm:h-[620px]">
          <CurtainReveal className="absolute inset-y-0 left-0 w-[78%] overflow-hidden rounded-[2.5rem]">
            <Photo image={family.images[0]} className="h-full w-full" sizes="(min-width:1024px) 40vw, 78vw" />
          </CurtainReveal>
          <motion.div style={{ y, rotate }} className="absolute right-0 bottom-12 h-[42%] w-[46%] origin-bottom-left">
            <div className="h-full w-full overflow-hidden rounded-[1.6rem] bg-sand-50 p-2 shadow-2xl shadow-forest-950/25">
              <Photo image={family.images[1]} className="h-full w-full rounded-[1.2rem]" sizes="25vw" />
            </div>
          </motion.div>
          <motion.span
            className="absolute top-8 right-4 flex h-28 w-28 items-center justify-center rounded-full bg-copper-400 p-4 text-center font-display text-lg leading-tight text-forest-950 italic shadow-xl"
            initial={{ scale: 0, rotate: -30 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.4 }}
            aria-hidden
          >
            para todas as idades
          </motion.span>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow">{family.eyebrow}</p>
            <h2 className="mt-5 font-display text-[clamp(2.3rem,4.6vw,4rem)] leading-[1.02] font-medium text-forest-900">{family.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-forest-900/70">{family.lead}</p>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {moments.map((m, i) => (
              <Reveal
                as="li"
                key={m.title}
                delay={i * 0.08}
                y={18}
                className="rounded-2xl bg-white/70 p-5 ring-1 ring-sand-200 transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-25px_rgb(12_26_19/0.35)]"
              >
                <Sparkles size={18} className="text-copper-500" aria-hidden />
                <p className="mt-3 font-display text-xl font-semibold text-forest-900">{m.title}</p>
                <p className="mt-1 text-sm text-forest-900/60">{m.text}</p>
                <div className="mt-2">
                  <StatusTag status={m.status} />
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2} className="mt-10">
            <button type="button" className="btn-dark" onClick={() => goToContact('Visita e passeios')}>
              Planejar um passeio em família
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
