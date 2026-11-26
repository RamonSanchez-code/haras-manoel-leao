import { useEffect, useRef } from 'react'

/**
 * Comportamento acessível de diálogo: trava o scroll, fecha com Esc,
 * mantém o foco dentro do painel e devolve o foco ao elemento de origem.
 */
export function useDialog<T extends HTMLElement>(open: boolean, onClose: () => void, onKey?: (e: KeyboardEvent) => void) {
  const ref = useRef<T>(null)
  const closeRef = useRef(onClose)
  const keyRef = useRef(onKey)
  useEffect(() => {
    closeRef.current = onClose
    keyRef.current = onKey
  })

  useEffect(() => {
    if (!open) return
    const previous = document.activeElement as HTMLElement | null
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbar}px`
    const t = setTimeout(() => ref.current?.querySelector<HTMLElement>('[data-autofocus],button,a')?.focus(), 30)

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return closeRef.current()
      keyRef.current?.(e)
      if (e.key !== 'Tab' || !ref.current) return
      const items = [...ref.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])')]
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      previous?.focus?.()
    }
  }, [open])

  return ref
}
