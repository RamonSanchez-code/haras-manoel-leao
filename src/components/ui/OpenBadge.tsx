import { useOpenStatus } from '../../lib/useOpenStatus'

/** Selo "Aberto agora / Fechado" calculado pelo horário de Brasília. */
export function OpenBadge({ dark = true, className = '' }: { dark?: boolean; className?: string }) {
  const { open, label } = useOpenStatus()
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
        dark ? 'bg-forest-950/55 text-sand-50 ring-1 ring-sand-50/20 backdrop-blur' : 'bg-white/80 text-forest-900 ring-1 ring-sand-200'
      } ${className}`}
      title="Horário de Brasília. Feriados podem ter horário diferente."
    >
      <span className="relative flex h-2.5 w-2.5">
        {open && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />}
        <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${open ? 'bg-emerald-400' : 'bg-copper-400'}`} />
      </span>
      {label}
    </span>
  )
}
