import { motion, type HTMLMotionProps } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

interface Props extends HTMLMotionProps<'div'> {
  delay?: number
  y?: number
  /** Elemento renderizado (use 'li' dentro de listas). */
  as?: 'div' | 'li' | 'article'
}

/** Revela o conteúdo ao entrar na tela (respeita prefers-reduced-motion via MotionConfig). */
export function Reveal({ delay = 0, y = 32, as = 'div', children, ...rest }: Props) {
  const M = motion[as] as typeof motion.div
  return (
    <M
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1, ease, delay }}
      {...rest}
    >
      {children}
    </M>
  )
}

/** Revela uma máscara (cortina) sobre imagens — efeito cinematográfico. */
export function CurtainReveal({ delay = 0, children, className = '' }: { delay?: number; children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.3, ease, delay }}
    >
      {children}
    </motion.div>
  )
}
