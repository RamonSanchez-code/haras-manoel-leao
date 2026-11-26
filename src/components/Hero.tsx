import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useReducedMotion } from '../lib/motion'
import { ChevronDown, MapPin } from 'lucide-react'
import { useRef } from 'react'
import { hero, location } from '../data/site'
import { scrollToId, SHOW_PENDING } from '../lib/links'
import { Magnetic } from './ui/Magnetic'
import { OpenBadge } from './ui/OpenBadge'
import { Photo } from './ui/Photo'

const ease = [0.22, 1, 0.36, 1] as const

/** Paisagem ilustrada em camadas — usada enquanto não há vídeo/foto oficial. */
function Landscape({ progress }: { progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const far = useTransform(progress, [0, 1], ['0%', '12%'])
  const mid = useTransform(progress, [0, 1], ['0%', '22%'])
  const near = useTransform(progress, [0, 1], ['0%', '34%'])
  const sun = useTransform(progress, [0, 1], ['0%', '40%'])
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0c1a13_0%,#1a3426_38%,#5a3e2b_68%,#cf9b63_100%)]" />
      <motion.div style={{ y: sun }} className="absolute top-[46%] left-1/2 h-[46vmin] w-[46vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#f3d2a2_0%,#cf9b63_38%,transparent_70%)] opacity-80 blur-[2px]" />
      <motion.svg style={{ y: far }} className="absolute bottom-0 h-[62%] w-full" viewBox="0 0 1440 500" preserveAspectRatio="none">
        <path d="M0 260 C 180 200, 320 240, 480 210 S 800 150, 980 200 S 1300 230, 1440 190 L1440 500 L0 500Z" fill="#335c45" opacity="0.55" />
      </motion.svg>
      <motion.svg style={{ y: mid }} className="absolute bottom-0 h-[52%] w-full" viewBox="0 0 1440 500" preserveAspectRatio="none">
        <path d="M0 300 C 220 250, 420 320, 640 280 S 1020 230, 1200 280 S 1380 300, 1440 290 L1440 500 L0 500Z" fill="#244633" />
        {/* árvores */}
        {[160, 210, 1080, 1130, 1185].map((x, i) => (
          <g key={x} transform={`translate(${x} ${282 - (i % 2) * 8})`} fill="#1a3426">
            <rect x="-3" y="0" width="6" height="30" />
            <ellipse cx="0" cy="-12" rx={26 - (i % 2) * 6} ry={32 - (i % 2) * 6} />
          </g>
        ))}
      </motion.svg>
      <motion.svg style={{ y: near }} className="absolute bottom-0 h-[38%] w-full" viewBox="0 0 1440 400" preserveAspectRatio="none">
        <path d="M0 250 C 260 210, 520 270, 760 240 S 1200 200, 1440 235 L1440 400 L0 400Z" fill="#12261b" />
        {/* cerca */}
        <g stroke="#0c1a13" strokeWidth="5" strokeLinecap="round">
          {Array.from({ length: 16 }, (_, i) => {
            const x = 40 + i * 92
            const y = 248 - Math.sin(i / 2.4) * 10
            return <line key={i} x1={x} y1={y} x2={x} y2={y - 46} />
          })}
          <path d="M40 216 C 400 196, 900 226, 1420 206" fill="none" strokeWidth="3" />
          <path d="M40 232 C 400 212, 900 242, 1420 222" fill="none" strokeWidth="3" />
        </g>
      </motion.svg>
    </div>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.18])
  // Parallax com o mouse: a foto se desloca levemente na direção oposta ao ponteiro
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(useTransform(mx, [-1, 1], [18, -18]), { stiffness: 60, damping: 20 })
  const py = useSpring(useTransform(my, [-1, 1], [12, -12]), { stiffness: 60, damping: 20 })
  const tx = useSpring(useTransform(mx, [-1, 1], [-8, 8]), { stiffness: 60, damping: 20 })
  const ty = useSpring(useTransform(my, [-1, 1], [-5, 5]), { stiffness: 60, damping: 20 })

  const hasVideo = Boolean(hero.video.mp4 || hero.video.webm)
  const hasImage = Boolean(hero.image.src)

  return (
    <section
      id="inicio"
      ref={ref}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse') return
        mx.set((e.clientX / window.innerWidth) * 2 - 1)
        my.set((e.clientY / window.innerHeight) * 2 - 1)
      }}
      className="relative isolate flex h-[100svh] min-h-[640px] items-end overflow-hidden bg-forest-950 text-sand-50"
    >
      {/* Mídia de fundo */}
      <motion.div className="absolute inset-0 -z-10" style={reduce ? undefined : { scale: mediaScale, x: px, y: py }}>
        {hasVideo ? (
          <video
            className="h-full w-full object-cover"
            autoPlay={!reduce}
            muted
            loop
            playsInline
            preload="metadata"
            poster={hero.image.src || undefined}
            aria-hidden
          >
            {hero.video.webm && <source src={hero.video.webm} type="video/webm" />}
            {hero.video.mp4 && <source src={hero.video.mp4} type="video/mp4" />}
          </video>
        ) : hasImage ? (
          <Photo image={hero.image} priority className="h-full w-full" imgClassName="animate-[slow-zoom_14s_ease-out_both]" />
        ) : (
          <Landscape progress={scrollYProgress} />
        )}
        {/* Véus para legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/35 to-forest-950/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgb(12_26_19/0.55)_100%)]" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 -z-10 grain" />

      {SHOW_PENDING && !hasVideo && !hasImage && (
        <p className="absolute top-28 right-5 z-10 max-w-[15rem] rounded-lg bg-forest-950/60 px-3 py-2 text-[0.65rem] leading-snug text-sand-100/80 ring-1 ring-sand-50/15 backdrop-blur sm:right-8">
          Vídeo/foto oficial pendente — configure <code className="text-copper-300">hero.video</code> ou{' '}
          <code className="text-copper-300">hero.image</code> em <code>src/data/site.ts</code>
        </p>
      )}

      <motion.div style={reduce ? undefined : { y: contentY, opacity: contentOpacity }} className="relative mx-auto w-full max-w-7xl px-5 pb-28 sm:px-8 sm:pb-32">
       <motion.div style={reduce ? undefined : { x: tx, y: ty }}>
        <motion.div
          className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.3 }}
        >
          <p className="eyebrow text-copper-300">
            <MapPin size={13} aria-hidden className="-mr-1" /> {hero.eyebrow}
          </p>
          <OpenBadge />
        </motion.div>

        <h1 className="font-display text-[clamp(2.7rem,7.6vw,7rem)] leading-[0.95] font-medium tracking-[-0.01em]" aria-label={hero.title.join(' ')}>
          {hero.title.map((line, i) => (
            <span key={line} className={`block pb-[0.08em] ${i === 1 ? 'text-copper-300 italic' : ''}`} aria-hidden>
              {line.split(' ').map((word, w) => (
                <span key={w} className="inline-block overflow-hidden pr-[0.22em] align-bottom">
                  <motion.span
                    className="inline-block"
                    initial={{ y: '110%', rotate: 6 }}
                    animate={{ y: '0%', rotate: 0 }}
                    transition={{ duration: 1.1, ease, delay: 0.45 + i * 0.25 + w * 0.06 }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-7 max-w-xl text-base leading-relaxed text-sand-100/85 sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 1 }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 1.2 }}
        >
          <Magnetic className="w-full sm:w-auto">
            <a href={`#${hero.primaryCta.target}`} onClick={(e) => (e.preventDefault(), scrollToId(hero.primaryCta.target))} className="btn-primary w-full sm:w-auto">
              {hero.primaryCta.label}
            </a>
          </Magnetic>
          <Magnetic className="w-full sm:w-auto">
            <a href={`#${hero.secondaryCta.target}`} onClick={(e) => (e.preventDefault(), scrollToId(hero.secondaryCta.target))} className="btn-ghost w-full sm:w-auto">
              {hero.secondaryCta.label}
            </a>
          </Magnetic>
        </motion.div>
       </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.button
        type="button"
        onClick={() => scrollToId('o-haras')}
        className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.6rem] tracking-[0.35em] text-sand-100/70 uppercase transition hover:text-sand-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        aria-label="Rolar para conhecer o Haras"
      >
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-sand-100/40">
          <span className="mt-2 h-2 w-0.5 rounded-full bg-copper-300 animate-[scroll-cue_1.8s_ease-in-out_infinite]" />
        </span>
        <ChevronDown size={14} aria-hidden />
      </motion.button>

      <span className="sr-only">{location.region}</span>
    </section>
  )
}
