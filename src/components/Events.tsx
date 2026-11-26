import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, CalendarDays, Check } from 'lucide-react'
import { useRef } from 'react'
import { events } from '../data/site'
import { goToContact, whatsappUrl } from '../lib/links'
import { HorseshoeIcon, WhatsAppIcon } from './ui/icons'
import { StatusTag } from './ui/Pending'
import { Photo } from './ui/Photo'
import { Reveal } from './ui/Reveal'

const today = new Date().toISOString().slice(0, 10)
const upcoming = events.upcoming.filter((e) => e.date >= today)

export function Events() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const clip = useTransform(scrollYProgress, [0, 0.35], ['inset(8% 6% 8% 6% round 2.5rem)', 'inset(0% 0% 0% 0% round 0rem)'])

  return (
    <section id="eventos" ref={ref} className="relative isolate overflow-hidden bg-forest-950 text-sand-50">
      <motion.div style={{ clipPath: clip }} className="absolute inset-0 -z-10">
        <motion.div style={{ y }} className="absolute -inset-y-[14%] inset-x-0">
          <Photo image={events.image} className="h-full w-full" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/75 to-forest-950/30" />
      </motion.div>

      <div className="mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-5 py-28 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow text-copper-300">{events.eyebrow}</p>
            <h2 className="mt-5 font-display text-[clamp(2.5rem,5.4vw,4.8rem)] leading-[1] font-medium">{events.title}</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-sand-100/80">{events.lead}</p>
          </Reveal>
          {events.facts.length > 0 && (
            <Reveal delay={0.1}>
              <ul className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
                {events.facts.map((f) => (
                  <li key={f.label} className="rounded-xl bg-sand-50/[0.06] p-4 ring-1 ring-sand-50/10">
                    <Check size={16} className="text-copper-300" aria-hidden />
                    <p className="mt-2 text-sm font-semibold text-sand-50">{f.label}</p>
                    <p className="text-xs text-sand-100/65">{f.value}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
          <Reveal delay={0.15} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button type="button" className="btn-primary" onClick={() => goToContact('Eventos e celebrações')}>
              {events.cta} <ArrowRight size={18} />
            </button>
            <a href={whatsappUrl(events.ctaMessage)} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <WhatsAppIcon size={18} /> Falar com a equipe
            </a>
          </Reveal>
        </div>

        <ul className="space-y-3 lg:col-span-4 lg:col-start-9">
          {events.types.map((t, i) => (
            <Reveal
              as="li"
              key={t.title}
              delay={0.1 + i * 0.08}
              y={20}
              className="group flex items-center justify-between gap-4 rounded-2xl bg-sand-50/[0.07] px-5 py-5 ring-1 ring-sand-50/15 backdrop-blur-md transition duration-500 hover:bg-sand-50/[0.12]"
            >
              <span className="flex items-center gap-4">
                <HorseshoeIcon size={18} className="text-copper-300 transition-transform duration-500 group-hover:rotate-[-15deg]" />
                <span className="font-display text-xl">{t.title}</span>
              </span>
              <StatusTag status={t.status} dark />
            </Reveal>
          ))}
          {upcoming.map((u) => (
            <Reveal as="li" key={u.title} delay={0.45} y={20}>
              <a
                href={u.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 block rounded-2xl bg-copper-400 p-5 text-forest-950 shadow-xl shadow-black/30 transition duration-500 hover:-translate-y-1 hover:bg-copper-300"
              >
                <span className="flex items-center gap-2 text-[0.65rem] font-bold tracking-[0.25em] uppercase">
                  <CalendarDays size={14} aria-hidden /> Próximo evento
                </span>
                <span className="mt-2 block font-display text-xl leading-tight font-semibold">{u.title}</span>
                <span className="mt-1 block text-sm font-medium">{u.dateLabel}</span>
                <span className="mt-1 block text-xs opacity-80">{u.details}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold underline underline-offset-2">
                  Ver no Instagram <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
