import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { size?: number }

const base = (size = 20) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
})

export function InstagramIcon({ size, ...p }: P) {
  return (
    <svg {...base(size)} {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  )
}

export function WhatsAppIcon({ size = 20, ...p }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.96 9.96 0 1 0 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.07.89.9-2.99-.2-.31a8.17 8.17 0 1 1 6.85 3.74Zm4.49-6.12c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.37-1.7c-.14-.25 0-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.47a.9.9 0 0 0-.66.31 2.76 2.76 0 0 0-.86 2.05 4.8 4.8 0 0 0 1 2.55c.13.16 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.6.19 1.13.16 1.56.1.47-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  )
}

/** Ferradura — ornamento da marca. */
export function HorseshoeIcon({ size, ...p }: P) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M7 21H4.5L4 13a8 8 0 0 1 16 0l-.5 8H17l.4-7.6a5.4 5.4 0 0 0-10.8 0Z" />
      <circle cx="6.3" cy="11" r="0.5" fill="currentColor" />
      <circle cx="17.7" cy="11" r="0.5" fill="currentColor" />
      <circle cx="5.6" cy="16" r="0.5" fill="currentColor" />
      <circle cx="18.4" cy="16" r="0.5" fill="currentColor" />
      <circle cx="8.8" cy="6.9" r="0.5" fill="currentColor" />
      <circle cx="15.2" cy="6.9" r="0.5" fill="currentColor" />
    </svg>
  )
}

/** Divisor ornamental com ferradura ao centro. */
export function Ornament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden>
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-current opacity-50" />
      <HorseshoeIcon size={18} />
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-current opacity-50" />
    </div>
  )
}
