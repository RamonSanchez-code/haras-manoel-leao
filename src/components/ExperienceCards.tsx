import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '../lib/motion'
import { ArrowUpRight, Baby, HandHeart, PartyPopper, UtensilsCrossed, X } from 'lucide-react'
import { useState } from 'react'
import { experiences, type Experience } from '../data/site'
import { goToContact, whatsappUrl } from '../lib/links'
import { useDialog } from '../lib/useDialog'
import { HorseshoeIcon, Ornament, WhatsAppIcon } from './ui/icons'
import { StatusTag } from './ui/Pending'
import { Photo } from './ui/Photo'
import { Reveal } from './ui/Reveal'

const icons = {
  horse: HorseshoeIcon,
  utensils: UtensilsCrossed,
  family: Baby,
  riding: HorseshoeIcon,
  party: PartyPopper,
  therapy: HandHeart,
}

/** Mapeia cada experiência ao assunto do formulário. */
const subjectFor: Record<string, string> = {
  passeios: 'Visita e passeios',
  gastronomia: 'Almoço / gastronomia',
  familia: 'Visita e passeios',
  hipismo: 'Hipismo / aulas de equitação',
  eventos: 'Eventos e celebrações',
  equoterapia: 'Equoterapia',
}

function Card({ exp, index, onOpen }: { exp: Experience; index: number; onOpen: () => void }) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 140, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 140, damping: 18 })
  const Icon = icons[exp.icon]

  return (
    <Reveal as="li" delay={(index % 3) * 0.1} className="[perspective:1200px]">
      <motion.article
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== 'mouse') return
          const r = e.currentTarget.getBoundingClientRect()
          mx.set((e.clientX - r.left) / r.width)
          my.set((e.clientY - r.top) / r.height)
        }}
        onPointerLeave={() => (mx.set(0.5), my.set(0.5))}
        style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="group relative h-[30rem] overflow-hidden rounded-[1.75rem] bg-forest-900 text-sand-50 shadow-[0_30px_60px_-30px_rgb(12_26_19/0.6)]"
      >
        <Photo
          image={exp.image}
          hintAt="top"
          className="absolute inset-0 h-full w-full transition-transform duration-[1.6s] ease-cinema group-hover:scale-110"
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/55 to-transparent transition-opacity duration-700 group-hover:opacity-95" />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-6">
          <span className="font-display text-sm text-sand-100/70 italic">{String(index + 1).padStart(2, '0')}</span>
          <StatusTag status={exp.status} dark />
        </div>

        <div className="absolute inset-x-0 bottom-0 p-7" style={{ transform: 'translateZ(40px)' }}>
          <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-copper-400/90 text-forest-950 transition-transform duration-700 ease-cinema group-hover:-translate-y-1">
            <Icon size={20} />
          </span>
          <h3 className="font-display text-[1.9rem] leading-tight font-medium">{exp.title}</h3>
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-cinema group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] max-lg:grid-rows-[1fr]">
            <p className="overflow-hidden text-sm leading-relaxed text-sand-100/80">
              <span className="block pt-2">{exp.summary}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onOpen}
            className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-copper-300 transition-colors after:absolute after:inset-0 hover:text-copper-300 focus-visible:text-sand-50"
            aria-haspopup="dialog"
          >
            Saiba mais
            <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </motion.article>
    </Reveal>
  )
}

function ExperienceModal({ exp, onClose }: { exp: Experience; onClose: () => void }) {
  const ref = useDialog<HTMLDivElement>(true, onClose)
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-forest-950/70 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`exp-${exp.id}-title`}
        onClick={(e) => e.stopPropagation()}
        className="relative grid max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] bg-sand-50 sm:rounded-[2rem] md:grid-cols-2"
        initial={{ y: 60, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Photo image={exp.image} className="h-56 md:h-full md:min-h-[28rem]" sizes="(min-width:768px) 448px, 100vw" />
        <div className="p-7 sm:p-10">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-sand-50/90 text-forest-900 shadow ring-1 ring-forest-900/10 transition hover:bg-white"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
          <StatusTag status={exp.status} />
          <h3 id={`exp-${exp.id}-title`} className="mt-3 font-display text-4xl leading-tight text-forest-900">
            {exp.title}
          </h3>
          <p className="mt-3 text-forest-900/75">{exp.summary}</p>
          <Ornament className="my-6 justify-start text-copper-500" />
          <ul className="space-y-3 text-sm leading-relaxed text-forest-900/70">
            {exp.details.map((d) => (
              <li key={d} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper-500" aria-hidden />
                {d}
              </li>
            ))}
          </ul>
          {exp.prices && exp.prices.length > 0 && (
            <div className="mt-6 rounded-2xl bg-sand-100 p-5">
              <p className="text-xs font-semibold tracking-[0.2em] text-copper-600 uppercase">Valores</p>
              <dl className="mt-3 divide-y divide-sand-200 text-sm">
                {exp.prices.map((p) => (
                  <div key={p.label} className="flex items-baseline justify-between gap-4 py-2">
                    <dt className="text-forest-900/75">
                      {p.label}
                      {p.note && <span className="block text-xs text-forest-900/50">{p.note}</span>}
                    </dt>
                    <dd className="font-display text-lg font-semibold whitespace-nowrap text-forest-900">{p.price}</dd>
                  </div>
                ))}
              </dl>
              {exp.pricesNote && <p className="mt-2 text-xs text-forest-900/50">{exp.pricesNote}</p>}
            </div>
          )}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappUrl(exp.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="btn-dark" data-autofocus>
              <WhatsAppIcon size={18} /> {exp.status === 'consultar' ? 'Consultar disponibilidade' : 'Falar no WhatsApp'}
            </a>
            <button
              type="button"
              className="btn-outline"
              onClick={() => {
                onClose()
                setTimeout(() => goToContact(subjectFor[exp.id]), 50)
              }}
            >
              Enviar mensagem
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ExperienceCards() {
  const [openId, setOpenId] = useState<string | null>(null)
  const current = experiences.find((e) => e.id === openId)

  return (
    <section id="experiencias" className="relative bg-sand-100 py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">Experiências</p>
          <h2 className="mt-5 font-display text-[clamp(2.3rem,4.8vw,4.2rem)] leading-[1.02] font-medium text-forest-900">
            Escolha como você quer <em className="text-copper-500">viver o dia</em>
          </h2>
          <p className="mt-5 text-lg text-forest-900/70">
            Do passeio a cavalo ao almoço sem pressa — experiências para cada estilo de visita.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp, i) => (
            <Card key={exp.id} exp={exp} index={i} onOpen={() => setOpenId(exp.id)} />
          ))}
        </ul>
      </div>

      <AnimatePresence>{current && <ExperienceModal key={current.id} exp={current} onClose={() => setOpenId(null)} />}</AnimatePresence>
    </section>
  )
}
