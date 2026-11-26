import { useReducedMotion as useFramerReducedMotion } from 'framer-motion'

/**
 * Só em desenvolvimento: abra o site com `?motion` na URL para ver as
 * animações mesmo que o sistema esteja com "reduzir movimento" ativado.
 * Em produção, a preferência do visitante é sempre respeitada.
 */
export const FORCE_MOTION = import.meta.env.DEV && typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('motion')

export function useReducedMotion() {
  const reduce = useFramerReducedMotion()
  return FORCE_MOTION ? false : reduce
}
