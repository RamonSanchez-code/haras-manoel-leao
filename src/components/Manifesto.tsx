import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useReducedMotion } from '../lib/motion'
import { useEffect, useRef, useState } from 'react'
import { manifesto } from '../data/site'
import { HorseshoeIcon } from './ui/icons'

/** Cada palavra acende conforme o visitante rola a página. */
function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const y = useTransform(progress, range, [6, 0])
  return (
    <motion.span style={{ opacity, y }} className="mr-[0.25em] inline-block">
      {children}
    </motion.span>
  )
}

/** Número que conta de 0 até o valor quando aparece na tela. */
function CountUp({ value, prefix = '' }: { value: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, value, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => controls.stop()
  }, [inView, reduce, value])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n}
    </span>
  )
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = manifesto.text.split(' ')
  const spin = useTransform(scrollYProgress, [0, 1], [-25, 25])

  return (
    <section aria-label="Sobre a experiência" className="relative overflow-hidden bg-forest-950 py-24 text-sand-50 sm:py-36 wood">
      <motion.div style={reduce ? undefined : { rotate: spin }} className="pointer-events-none absolute -right-24 -bottom-24 text-forest-800" aria-hidden>
        <HorseshoeIcon size={420} strokeWidth={0.5} />
      </motion.div>

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <div ref={ref}>
          <p className="font-display text-[clamp(1.9rem,4.4vw,3.6rem)] leading-[1.15] font-medium">
            <span className="sr-only">{manifesto.text}</span>
            <span aria-hidden>
              {reduce
                ? manifesto.text
                : words.map((w, i) => (
                    <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                      {w}
                    </Word>
                  ))}
            </span>
          </p>
        </div>

        <dl className="mt-16 grid gap-10 border-t border-sand-50/10 pt-12 sm:grid-cols-3">
          {manifesto.facts.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
            >
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="block font-display text-6xl font-semibold text-copper-300 sm:text-7xl">
                  <CountUp value={f.value} prefix={f.prefix} />
                </span>
                <span className="mt-2 block text-sm text-sand-100/70">{f.label}</span>
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  )
}
