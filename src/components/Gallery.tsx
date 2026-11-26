import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '../lib/motion'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { gallery, type GalleryItem } from '../data/site'
import { useDialog } from '../lib/useDialog'
import { Photo } from './ui/Photo'
import { Reveal } from './ui/Reveal'

const shapeClass: Record<GalleryItem['shape'], string> = {
  big: 'col-span-2 row-span-2',
  tall: 'row-span-2',
  wide: 'col-span-2',
  square: '',
}

function Tile({ item, index, onOpen }: { item: GalleryItem; index: number; onOpen: () => void }) {
  const ref = useRef<HTMLLIElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <motion.li
      ref={ref}
      className={`${shapeClass[item.shape]} relative`}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.08 }}
    >
      <button
        type="button"
        onClick={onOpen}
        className="group relative block h-full w-full overflow-hidden rounded-2xl bg-forest-800 text-left sm:rounded-[1.4rem]"
        aria-label={`Ampliar foto: ${item.alt}`}
      >
        <motion.div style={reduce ? undefined : { y, scale: 1.14 }} className="absolute inset-0">
          <Photo image={item} className="h-full w-full transition-transform duration-[1.4s] ease-cinema group-hover:scale-[1.06]" sizes="(min-width:1024px) 25vw, 50vw" />
        </motion.div>
        <span className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
        {item.caption && (
          <span className="absolute bottom-4 left-4 flex translate-y-3 items-center gap-2 font-display text-xl text-sand-50 italic opacity-0 transition-all duration-500 ease-cinema group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            {item.caption}
          </span>
        )}
        <span className="absolute top-4 right-4 flex h-9 w-9 scale-75 items-center justify-center rounded-full bg-sand-50/90 text-forest-900 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
          <Expand size={15} aria-hidden />
        </span>
      </button>
    </motion.li>
  )
}

function Lightbox({ index, setIndex, onClose }: { index: number; setIndex: (i: number) => void; onClose: () => void }) {
  const total = gallery.length
  const [dir, setDir] = useState(1)
  const go = useCallback(
    (step: number) => {
      setDir(step)
      setIndex((index + step + total) % total)
    },
    [index, setIndex, total],
  )
  const ref = useDialog<HTMLDivElement>(true, onClose, (e) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  })
  const item = gallery[index]

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Galeria de fotos ampliada"
      className="fixed inset-0 z-[70] flex flex-col bg-forest-950/96 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex items-center justify-between px-5 py-4 text-sand-100 sm:px-8">
        <span className="font-display text-lg tabular-nums" aria-live="polite">
          {String(index + 1).padStart(2, '0')} <span className="opacity-40">/ {String(total).padStart(2, '0')}</span>
        </span>
        <button type="button" onClick={onClose} className="flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-sand-50/25 transition hover:bg-sand-50/10" aria-label="Fechar galeria" data-autofocus>
          <X size={22} />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 sm:px-20">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.figure
            key={index}
            custom={dir}
            className="flex h-full max-h-[78dvh] w-full max-w-6xl flex-col items-center justify-center"
            initial={{ opacity: 0, x: dir * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -80 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) go(1)
              else if (info.offset.x > 70) go(-1)
            }}
          >
            {item.src ? (
              <img src={item.src} alt={item.alt} className="max-h-full max-w-full rounded-xl object-contain shadow-2xl" draggable={false} />
            ) : (
              <Photo image={item} className="aspect-[4/3] w-full max-w-4xl rounded-xl" />
            )}
            <figcaption className="mt-4 text-center text-sm text-sand-100/75">
              {item.alt}
              {item.credit && <span className="mt-1 block text-xs text-sand-100/45">{item.credit}</span>}
            </figcaption>
          </motion.figure>
        </AnimatePresence>

        <button type="button" onClick={() => go(-1)} className="absolute left-2 hidden h-14 w-14 items-center justify-center rounded-full bg-sand-50/10 text-sand-50 ring-1 ring-sand-50/20 transition hover:bg-sand-50/20 sm:left-6 sm:flex" aria-label="Foto anterior">
          <ChevronLeft size={26} />
        </button>
        <button type="button" onClick={() => go(1)} className="absolute right-2 hidden h-14 w-14 items-center justify-center rounded-full bg-sand-50/10 text-sand-50 ring-1 ring-sand-50/20 transition hover:bg-sand-50/20 sm:right-6 sm:flex" aria-label="Próxima foto">
          <ChevronRight size={26} />
        </button>
      </div>

      {/* Miniaturas / navegação mobile */}
      <div className="flex items-center justify-center gap-3 px-4 py-5">
        <button type="button" onClick={() => go(-1)} className="flex h-12 w-12 items-center justify-center rounded-full text-sand-50 ring-1 ring-sand-50/20 sm:hidden" aria-label="Foto anterior">
          <ChevronLeft size={22} />
        </button>
        <div className="flex gap-2">
          {gallery.map((_, i) => (
            <button
              key={`dot-${i}`}
              type="button"
              onClick={() => (setDir(i > index ? 1 : -1), setIndex(i))}
              className={`h-2 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-copper-400' : 'w-2 bg-sand-50/30 hover:bg-sand-50/60'}`}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(1)} className="flex h-12 w-12 items-center justify-center rounded-full text-sand-50 ring-1 ring-sand-50/20 sm:hidden" aria-label="Próxima foto">
          <ChevronRight size={22} />
        </button>
      </div>
    </motion.div>
  )
}

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="galeria" className="relative bg-forest-950 py-24 text-sand-50 sm:py-36 wood">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-copper-300">Galeria</p>
            <h2 className="mt-5 font-display text-[clamp(2.3rem,4.8vw,4.2rem)] leading-[1.02] font-medium">
              Sinta-se aqui, <em className="text-copper-300">antes mesmo de chegar</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="max-w-sm text-sand-100/70">
            Toque em uma foto para ampliar. Use as setas do teclado ou deslize para navegar.
          </Reveal>
        </div>

        <ul className="mt-14 grid auto-rows-[9.5rem] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:gap-4 lg:grid-cols-4 lg:auto-rows-[15rem]">
          {gallery.map((item, i) => (
            <Tile key={`${i}-${item.src || item.hint}`} item={item} index={i} onOpen={() => setOpen(i)} />
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {open !== null && <Lightbox index={open} setIndex={(i) => setOpen(i)} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  )
}
