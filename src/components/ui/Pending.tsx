import { Clock3 } from 'lucide-react'
import type { Status } from '../../data/site'

/** Selo exibido em serviços ainda não confirmados com o Haras. */
export function StatusTag({ status, dark = false }: { status: Status; dark?: boolean }) {
  if (status === 'confirmado') return null
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.15em] uppercase ${
        dark ? 'bg-sand-50/15 text-sand-100 ring-1 ring-sand-50/25' : 'bg-copper-400/15 text-copper-600 ring-1 ring-copper-500/25'
      }`}
    >
      <Clock3 size={11} aria-hidden /> Sob consulta
    </span>
  )
}
