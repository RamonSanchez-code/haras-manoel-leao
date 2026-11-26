import { brand } from '../data/site'
import { HorseshoeIcon } from './ui/icons'

/**
 * Logotipo do Haras. Com `brand.logoIsBadge`, o arquivo (hoje a imagem de
 * perfil oficial do Instagram) aparece como selo redondo ao lado do nome.
 * Sem arquivo, usa apenas o nome em tipografia (sem criar nova marca).
 */
export function Logo({ light = false, className = '' }: { light?: boolean; className?: string }) {
  if (brand.logo && !brand.logoIsBadge) {
    return <img src={brand.logo} alt={brand.name} className={`h-12 w-auto ${className}`} />
  }
  return (
    <span className={`flex items-center gap-3 ${light ? 'text-sand-50' : 'text-forest-900'} ${className}`}>
      {brand.logo ? (
        <img
          src={brand.logo}
          alt=""
          width={44}
          height={44}
          className="h-11 w-11 shrink-0 rounded-full object-cover shadow-md ring-2 ring-copper-400/70"
        />
      ) : (
        <HorseshoeIcon size={26} className="text-copper-400" />
      )}
      <span className="flex flex-col leading-none">
        <span className="text-[0.55rem] font-semibold tracking-[0.42em] uppercase opacity-80">Haras</span>
        <span className="font-display text-[1.45rem] font-semibold tracking-wide whitespace-nowrap">{brand.shortName}</span>
      </span>
    </span>
  )
}
