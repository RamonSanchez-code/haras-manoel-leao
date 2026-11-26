import { contact, location } from '../data/site'

/** Mostra marcações de conteúdo pendente (controlado por VITE_SHOW_PENDING). */
export const SHOW_PENDING = import.meta.env.VITE_SHOW_PENDING !== 'false'

export const FORM_ENDPOINT: string = import.meta.env.VITE_FORM_ENDPOINT ?? ''

/** True quando há número configurado e a mensagem pode ser pré-preenchida. */
export const hasWhatsAppNumber = contact.whatsapp.number.replace(/\D/g, '').length >= 10

/**
 * Monta o link do WhatsApp. Com número configurado, usa wa.me com texto
 * pré-preenchido; sem número, usa o link oficial publicado na bio do Instagram.
 */
export function whatsappUrl(message: string = contact.whatsapp.defaultMessage): string {
  const digits = contact.whatsapp.number.replace(/\D/g, '')
  if (digits.length >= 10) {
    return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
  }
  return contact.whatsapp.fallbackUrl
}

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`
export const wazeUrl = `https://waze.com/ul?ll=${location.lat},${location.lng}&navigate=yes`
export const mapEmbedUrl = `https://www.google.com/maps?q=${location.lat},${location.lng}&z=15&hl=pt-BR&output=embed`

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  // Move o foco para a seção (acessibilidade por teclado / leitor de tela)
  el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

/** Evento global para pré-selecionar o assunto do formulário de contato. */
export const PREFILL_EVENT = 'haras:prefill-subject'
export function goToContact(subject?: string) {
  if (subject) window.dispatchEvent(new CustomEvent(PREFILL_EVENT, { detail: subject }))
  scrollToId('contato')
}
