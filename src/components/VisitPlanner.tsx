import { AnimatePresence, motion, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '../lib/motion'
import { Baby, CalendarDays, Check, Clock, Minus, Plus, Users } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { planner, type PlannerItem } from '../data/site'
import { whatsappUrl } from '../lib/links'
import { hoursFor } from '../lib/useOpenStatus'
import { WhatsAppIcon } from './ui/icons'
import { Magnetic } from './ui/Magnetic'
import { Reveal } from './ui/Reveal'

const DAYS = [
  { d: 6, short: 'Sáb', long: 'Sábado' },
  { d: 0, short: 'Dom', long: 'Domingo' },
  { d: 1, short: 'Seg', long: 'Segunda-feira' },
  { d: 2, short: 'Ter', long: 'Terça-feira' },
  { d: 3, short: 'Qua', long: 'Quarta-feira' },
  { d: 4, short: 'Qui', long: 'Quinta-feira' },
  { d: 5, short: 'Sex', long: 'Sexta-feira' },
]

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

function AnimatedPrice({ value }: { value: number }) {
  const reduce = useReducedMotion()
  const spring = useSpring(value, { stiffness: 90, damping: 20 })
  const text = useTransform(spring, (v) => brl.format(Math.round(v)))
  useEffect(() => spring.set(value), [spring, value])
  return <motion.span className="tabular-nums">{reduce ? brl.format(value) : text}</motion.span>
}

function Stepper({ label, value, onChange, min = 0, icon }: { label: string; value: number; onChange: (n: number) => void; min?: number; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/80 p-4 ring-1 ring-sand-200">
      <span className="flex items-center gap-3 text-sm font-semibold text-forest-900">
        {icon}
        {label}
      </span>
      <span className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-sand-100 text-forest-900 transition hover:bg-sand-200 active:scale-90 disabled:opacity-40"
          aria-label={`Diminuir ${label.toLowerCase()}`}
        >
          <Minus size={16} />
        </button>
        <output className="w-7 text-center font-display text-2xl font-semibold tabular-nums" aria-live="polite" aria-label={label}>
          {value}
        </output>
        <button
          type="button"
          onClick={() => onChange(Math.min(99, value + 1))}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-900 text-sand-50 transition hover:bg-forest-700 active:scale-90"
          aria-label={`Aumentar ${label.toLowerCase()}`}
        >
          <Plus size={16} />
        </button>
      </span>
    </div>
  )
}

export function VisitPlanner() {
  const [day, setDay] = useState(6)
  const [adults, setAdults] = useState(2)
  const [kids, setKids] = useState(1)
  const [picked, setPicked] = useState<Record<string, boolean>>({ almoco: true, cavalo: true })
  const [qty, setQty] = useState<Record<string, number | undefined>>({})

  const people = adults + kids
  const available = (it: PlannerItem) => !it.weekdays || it.weekdays.includes(day)
  const autoQty = (it: PlannerItem) => (it.defaultQty === 'criancas' ? kids : people)
  const qtyOf = (it: PlannerItem) => qty[it.id] ?? autoQty(it)
  const hours = hoursFor(day)

  const lines = useMemo(
    () =>
      planner.items
        .filter((it) => picked[it.id] && (!it.weekdays || it.weekdays.includes(day)))
        .map((it) => {
          if (it.group === 'refeicao') {
            const total = adults * it.adult + kids * (it.child ?? it.adult)
            const desc = [adults && `${adults} adulto${adults > 1 ? 's' : ''}`, kids && `${kids} criança${kids > 1 ? 's' : ''}`].filter(Boolean).join(' + ')
            return { id: it.id, label: it.label, desc, total }
          }
          const q = qty[it.id] ?? (it.defaultQty === 'criancas' ? kids : adults + kids)
          return { id: it.id, label: it.label, desc: `${q} × ${brl.format(it.adult)}`, total: q * it.adult }
        })
        .filter((l) => l.total > 0),
    [picked, day, adults, kids, qty],
  )
  const total = lines.reduce((s, l) => s + l.total, 0)
  const dayName = DAYS.find((d) => d.d === day)!.long

  const message = [
    'Olá! Montei minha visita pelo site do Haras Manoel Leão:',
    '',
    `*Dia:* ${dayName}${hours ? ` (aberto ${hours.hours})` : ''}`,
    `*Pessoas:* ${adults} adulto(s) e ${kids} criança(s) de 5 a 10 anos`,
    ...(lines.length ? ['', '*Quero aproveitar:*', ...lines.map((l) => `• ${l.label} — ${l.desc} = ${brl.format(l.total)}`)] : []),
    '',
    `*Estimativa:* ${brl.format(total)}`,
    '',
    'Podem confirmar a disponibilidade e os valores?',
  ].join('\n')

  const toggle = (id: string) => setPicked((p) => ({ ...p, [id]: !p[id] }))

  return (
    <section id="planeje" className="relative overflow-hidden bg-sand-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{planner.eyebrow}</p>
          <h2 className="mt-5 font-display text-[clamp(2.3rem,4.6vw,4rem)] leading-[1.02] font-medium text-forest-900">{planner.title}</h2>
          <p className="mt-5 text-lg text-forest-900/70">{planner.lead}</p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* Escolhas */}
          <Reveal className="space-y-8 lg:col-span-7">
            <fieldset>
              <legend className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-copper-600 uppercase">
                <CalendarDays size={14} aria-hidden /> Qual dia?
              </legend>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Dia da visita">
                {DAYS.map(({ d, short, long }) => {
                  const on = d === day
                  return (
                    <button
                      key={d}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      aria-label={long}
                      onClick={() => setDay(d)}
                      className={`relative min-h-11 rounded-full px-4 text-sm font-semibold transition-colors ${on ? 'text-sand-50' : 'bg-white/80 text-forest-900 ring-1 ring-sand-200 hover:ring-copper-400'}`}
                    >
                      {on && <motion.span layoutId="day-pill" className="absolute inset-0 rounded-full bg-forest-900" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                      <span className="relative">{short}</span>
                    </button>
                  )
                })}
              </div>
              <p className="mt-3 flex items-center gap-2 text-sm text-forest-900/65">
                <Clock size={14} aria-hidden /> {dayName}: {hours ? `aberto das ${hours.hours}` : 'consulte o horário'}
              </p>
            </fieldset>

            <fieldset className="grid gap-3 sm:grid-cols-2">
              <legend className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-copper-600 uppercase">
                <Users size={14} aria-hidden /> Quem vem?
              </legend>
              <Stepper label="Adultos" value={adults} onChange={setAdults} icon={<Users size={18} className="text-copper-500" />} />
              <Stepper label="Crianças (5 a 10)" value={kids} onChange={setKids} icon={<Baby size={18} className="text-copper-500" />} />
            </fieldset>

            {(['refeicao', 'atividade'] as const).map((group) => (
              <fieldset key={group}>
                <legend className="mb-3 text-xs font-semibold tracking-[0.2em] text-copper-600 uppercase">
                  {group === 'refeicao' ? 'Refeições' : 'Atividades'}
                </legend>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {planner.items
                    .filter((it) => it.group === group)
                    .map((it) => {
                      const ok = available(it)
                      const on = Boolean(picked[it.id]) && ok
                      return (
                        <li key={it.id}>
                          <div
                            className={`group relative h-full rounded-2xl p-4 transition-all duration-300 ${
                              on ? 'bg-forest-900 text-sand-50 shadow-lg shadow-forest-950/20' : 'bg-white/80 text-forest-900 ring-1 ring-sand-200 hover:-translate-y-0.5 hover:ring-copper-400'
                            } ${ok ? '' : 'opacity-50'}`}
                          >
                            <button
                              type="button"
                              role="checkbox"
                              aria-checked={on}
                              disabled={!ok}
                              onClick={() => toggle(it.id)}
                              className="flex w-full items-start gap-3 text-left after:absolute after:inset-0 after:rounded-2xl disabled:cursor-not-allowed"
                            >
                              <span
                                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition ${on ? 'bg-copper-400 text-forest-950' : 'ring-2 ring-sand-300'}`}
                              >
                                <AnimatePresence>
                                  {on && (
                                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                      <Check size={15} strokeWidth={3} />
                                    </motion.span>
                                  )}
                                </AnimatePresence>
                              </span>
                              <span>
                                <span className="block font-semibold">{it.label}</span>
                                <span className={`block text-xs ${on ? 'text-sand-100/70' : 'text-forest-900/55'}`}>
                                  {ok ? it.detail : 'Disponível só aos domingos'}
                                </span>
                                {it.group === 'refeicao' && (
                                  <span className={`mt-1 block text-xs font-semibold ${on ? 'text-copper-300' : 'text-copper-600'}`}>
                                    {brl.format(it.adult)} adulto · {brl.format(it.child ?? it.adult)} criança
                                  </span>
                                )}
                              </span>
                            </button>
                            {it.group === 'atividade' && on && (
                              <div className="relative z-10 mt-3 flex items-center justify-between rounded-xl bg-sand-50/10 px-3 py-1.5">
                                <span className="text-xs text-sand-100/80">Quantidade</span>
                                <span className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setQty((q) => ({ ...q, [it.id]: Math.max(0, qtyOf(it) - 1) }))}
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-sand-50/15 hover:bg-sand-50/25"
                                    aria-label={`Diminuir ${it.label}`}
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <span className="w-5 text-center font-semibold tabular-nums">{qtyOf(it)}</span>
                                  <button
                                    type="button"
                                    onClick={() => setQty((q) => ({ ...q, [it.id]: qtyOf(it) + 1 }))}
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-copper-400 text-forest-950 hover:bg-copper-300"
                                    aria-label={`Aumentar ${it.label}`}
                                  >
                                    <Plus size={14} />
                                  </button>
                                </span>
                              </div>
                            )}
                          </div>
                        </li>
                      )
                    })}
                </ul>
              </fieldset>
            ))}
          </Reveal>

          {/* Resumo */}
          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="sticky top-28 overflow-hidden rounded-[2rem] bg-forest-950 p-7 text-sand-50 shadow-2xl shadow-forest-950/30 grain sm:p-9">
              <p className="text-xs font-semibold tracking-[0.25em] text-copper-300 uppercase">Seu dia no Haras</p>
              <p className="mt-2 font-display text-3xl">
                {dayName} · {people} {people === 1 ? 'pessoa' : 'pessoas'}
              </p>

              <ul className="mt-6 min-h-24 space-y-3 border-y border-sand-50/10 py-5 text-sm">
                <AnimatePresence initial={false}>
                  {lines.length === 0 && (
                    <motion.li key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-sand-100/55">
                      Escolha refeições e atividades para ver a estimativa.
                    </motion.li>
                  )}
                  {lines.map((l) => (
                    <motion.li
                      key={l.id}
                      layout
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.35 }}
                      className="flex items-start justify-between gap-4"
                    >
                      <span>
                        <span className="block font-semibold">{l.label}</span>
                        <span className="text-xs text-sand-100/55">{l.desc}</span>
                      </span>
                      <span className="font-semibold whitespace-nowrap tabular-nums">{brl.format(l.total)}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              <div className="mt-5 flex items-end justify-between gap-4">
                <span className="text-sm text-sand-100/70">Estimativa</span>
                <span className="font-display text-5xl font-semibold text-copper-300">
                  <AnimatedPrice value={total} />
                </span>
              </div>

              <Magnetic className="mt-7 w-full" strength={0.15}>
                <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" className="btn w-full bg-[#25D366] text-forest-950 hover:brightness-105">
                  <WhatsAppIcon size={20} /> Enviar meu plano pelo WhatsApp
                </a>
              </Magnetic>
              <p className="mt-4 text-[0.7rem] leading-relaxed text-sand-100/50">{planner.note}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
