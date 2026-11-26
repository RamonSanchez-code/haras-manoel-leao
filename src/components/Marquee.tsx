import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap } from 'framer-motion'
import { useReducedMotion } from '../lib/motion'
import { useRef } from 'react'
import { marqueeWords } from '../data/site'
import { HorseshoeIcon } from './ui/icons'

/**
 * Faixa de palavras em movimento contínuo. A velocidade e a direção
 * acompanham o scroll do visitante (rolar para cima inverte o sentido).
 */
export function Marquee({ tone = 'sand', baseVelocity = -2.2 }: { tone?: 'sand' | 'copper'; baseVelocity?: number }) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false })
  const direction = useRef(1)
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`)
  const skew = useTransform(velocity, [-2000, 0, 2000], [-6, 0, 6])

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let move = direction.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    move += direction.current * move * f
    baseX.set(baseX.get() + move)
  })

  const items = [...marqueeWords, ...marqueeWords]
  const colors = tone === 'copper' ? 'bg-copper-400 text-forest-950' : 'bg-sand-100 text-forest-900'

  return (
    <div className={`relative overflow-hidden border-y border-forest-900/10 py-6 sm:py-8 ${colors}`} aria-hidden>
      <motion.div style={reduce ? undefined : { x, skewX: skew }} className="flex w-max whitespace-nowrap">
        {[0, 1, 2, 3].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {items.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center font-display text-4xl italic sm:text-6xl">
                <span className="px-6 sm:px-10">{w}</span>
                <HorseshoeIcon size={26} className={tone === 'copper' ? 'text-forest-900/60' : 'text-copper-500'} />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
