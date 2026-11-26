import { motion, useScroll, useTransform } from 'framer-motion'
import { Clock, FileText, UtensilsCrossed } from 'lucide-react'
import { useRef } from 'react'
import { gastronomy } from '../data/site'
import { SHOW_PENDING, whatsappUrl } from '../lib/links'
import { Ornament, WhatsAppIcon } from './ui/icons'
import { StatusTag } from './ui/Pending'
import { Photo } from './ui/Photo'
import { CurtainReveal, Reveal } from './ui/Reveal'

export function Gastronomy() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yA = useTransform(scrollYProgress, [0, 1], [80, -80])
  const yB = useTransform(scrollYProgress, [0, 1], [-40, 60])
  const [a, b, c] = gastronomy.images
  const visibleHighlights = gastronomy.highlights.filter((h) => h.status === 'confirmado' || SHOW_PENDING)

  return (
    <section id="gastronomia" ref={ref} className="relative overflow-hidden bg-earth-900 py-24 text-sand-50 sm:py-36 grain">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgb(207_155_99/0.18),transparent_55%)]" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-copper-300">{gastronomy.eyebrow}</p>
            <h2 className="mt-5 font-display text-[clamp(2.3rem,4.6vw,4rem)] leading-[1.02] font-medium">{gastronomy.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-sand-100/75">{gastronomy.lead}</p>
          </Reveal>

          <ul className="mt-10 space-y-5">
            {visibleHighlights.map((h, i) => (
              <Reveal as="li" key={h.title} delay={i * 0.08} y={16} className="flex gap-4 border-b border-sand-50/10 pb-5">
                <UtensilsCrossed size={18} className="mt-1 shrink-0 text-copper-300" aria-hidden />
                <div>
                  <p className="flex flex-wrap items-center gap-3 font-display text-2xl">
                    {h.title} <StatusTag status={h.status} dark />
                  </p>
                  <p className="mt-1 text-sm text-sand-100/60">{h.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          {/* Funcionamento */}
          <Reveal delay={0.1} className="mt-10 rounded-2xl bg-sand-50/[0.06] p-6 ring-1 ring-sand-50/10 backdrop-blur">
            <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-copper-300 uppercase">
              <Clock size={14} aria-hidden /> Funcionamento
            </p>
            <dl className="mt-4 space-y-2 text-sm">
              {gastronomy.hours.map((h) => (
                <div key={h.label} className="flex justify-between gap-6">
                  <dt className="text-sand-100/60">{h.label}</dt>
                  <dd className="text-right font-medium">{h.value || 'Consulte pelo WhatsApp'}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Cardápio */}
          <Reveal delay={0.15} className="mt-6">
            {gastronomy.menu.length > 0 ? (
              <div className="rounded-2xl bg-sand-50 p-6 text-forest-900">
                <p className="text-center font-display text-3xl">Valores</p>
                <Ornament className="my-3 text-copper-500" />
                <ul className="divide-y divide-sand-200">
                  {gastronomy.menu.map((m) => (
                    <li key={m.name} className="flex justify-between gap-4 py-3">
                      <span>
                        <span className="font-semibold">{m.name}</span>
                        {m.description && <span className="block text-sm text-forest-900/60">{m.description}</span>}
                      </span>
                      {m.price && <span className="font-display text-lg whitespace-nowrap">{m.price}</span>}
                    </li>
                  ))}
                </ul>
                {gastronomy.menuNote && <p className="mt-3 text-center text-xs text-forest-900/50">{gastronomy.menuNote}</p>}
              </div>
            ) : (
              <p className="text-sm text-sand-100/60">
                Cardápio sob consulta — peça pelo WhatsApp as opções do dia.
                {SHOW_PENDING && <span className="ml-1 text-copper-300">(Cardápio oficial pendente: <code>gastronomy.menu</code>)</span>}
              </p>
            )}
          </Reveal>

          <Reveal delay={0.2} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappUrl(gastronomy.ctaMessage)} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <WhatsAppIcon size={18} /> Consultar disponibilidade
            </a>
            {gastronomy.menuPdf && (
              <a href={gastronomy.menuPdf} target="_blank" rel="noopener" className="btn-ghost">
                <FileText size={18} /> Ver cardápio (PDF)
              </a>
            )}
          </Reveal>
        </div>

        {/* Composição de fotos */}
        <div className="relative h-[560px] sm:h-[720px] lg:col-span-6 lg:col-start-7">
          <motion.div style={{ y: yA }} className="absolute top-0 right-0 h-[70%] w-[72%]">
            <CurtainReveal className="h-full w-full overflow-hidden rounded-t-full rounded-b-[2rem] shadow-2xl shadow-black/40">
              <Photo image={a} className="h-full w-full" sizes="(min-width:1024px) 36vw, 72vw" />
            </CurtainReveal>
          </motion.div>
          <motion.div style={{ y: yB }} className="absolute bottom-0 left-0 h-[44%] w-[54%]">
            <CurtainReveal delay={0.2} className="h-full w-full overflow-hidden rounded-[1.8rem] ring-8 ring-earth-900 shadow-xl">
              <Photo image={b} className="h-full w-full" sizes="(min-width:1024px) 28vw, 54vw" />
            </CurtainReveal>
          </motion.div>
          <CurtainReveal delay={0.35} className="absolute right-[8%] bottom-[4%] hidden h-[22%] w-[26%] overflow-hidden rounded-full ring-8 ring-earth-900 sm:block">
            <Photo image={c} className="h-full w-full" sizes="15vw" />
          </CurtainReveal>
        </div>
      </div>
    </section>
  )
}
