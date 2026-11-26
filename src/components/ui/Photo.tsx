import { ImageOff } from 'lucide-react'
import { useState } from 'react'
import type { SiteImage } from '../../data/site'
import { imageManifest as images, srcSetFor } from '../../lib/images'
import { SHOW_PENDING } from '../../lib/links'
import { HorseshoeIcon } from './icons'

const tones: Record<NonNullable<SiteImage['tone']>, string> = {
  forest: 'from-forest-700 via-forest-800 to-forest-950',
  earth: 'from-earth-500 via-earth-700 to-earth-900',
  sand: 'from-sand-300 via-sand-400 to-earth-500',
  copper: 'from-copper-400 via-copper-600 to-earth-800',
}

interface Props {
  image: SiteImage
  className?: string
  imgClassName?: string
  /** Prioriza o carregamento (usar apenas na primeira dobra). */
  priority?: boolean
  sizes?: string
  /** Posição da etiqueta do espaço reservado. */
  hintAt?: 'center' | 'top'
}

/**
 * Imagem otimizada: WebP responsivo (srcset do manifesto), lazy loading,
 * decoding assíncrono e prioridade configurável para a primeira dobra. Quando a foto oficial ainda
 * não foi fornecida — ou falha ao carregar — mostra um espaço reservado
 * identificado, nunca uma área vazia silenciosa.
 */
export function Photo({ image, className = '', imgClassName = '', priority, sizes = '100vw', hintAt = 'center' }: Props) {
  const [failed, setFailed] = useState(false)
  const missing = !image.src || failed

  if (missing) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className={`relative isolate overflow-hidden bg-gradient-to-br ${tones[image.tone ?? 'forest']} grain ${className}`}
      >
        <svg className="absolute inset-0 h-full w-full opacity-[0.14]" preserveAspectRatio="none" viewBox="0 0 400 300" aria-hidden>
          <path d="M0 210 C 80 170, 140 200, 210 180 S 330 150, 400 175 L400 300 L0 300Z" fill="white" />
          <path d="M0 245 C 90 220, 170 250, 260 230 S 360 215, 400 225 L400 300 L0 300Z" fill="white" />
        </svg>
        <div className={`absolute inset-0 flex flex-col items-center gap-2 p-4 text-center text-white/70 ${hintAt === 'top' ? 'justify-start pt-16' : 'justify-center'}`}>
          <HorseshoeIcon size={30} className="opacity-60" />
          {SHOW_PENDING && (
            <span className="max-w-[16rem] text-[0.68rem] leading-snug font-medium tracking-wide">
              <span className="mb-1 flex items-center justify-center gap-1.5 text-[0.6rem] tracking-[0.25em] uppercase opacity-80">
                <ImageOff size={12} aria-hidden /> {failed ? 'Arquivo não encontrado' : 'Foto oficial pendente'}
              </span>
              {image.hint}
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden bg-sand-200 ${className}`}>
      <img
        src={image.src}
        srcSet={srcSetFor(image.src)}
        width={images[image.src]?.width}
        height={images[image.src]?.height}
        alt={image.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        sizes={sizes}
        onError={() => {
          console.warn(`[Haras] Imagem não encontrada: ${image.src}`)
          setFailed(true)
        }}
        style={image.position ? { objectPosition: image.position } : undefined}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
      {image.illustrative && (
        <span className="pointer-events-none absolute right-2.5 bottom-2.5 z-10 rounded-full bg-forest-950/60 px-2 py-0.5 text-[0.6rem] font-medium tracking-wide text-sand-50/90 backdrop-blur-sm">
          Imagem ilustrativa
        </span>
      )}
    </div>
  )
}
