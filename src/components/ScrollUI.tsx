import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { nav } from '../data/site'
import { scrollToId } from '../lib/links'

/** Barra de progresso de leitura no topo da página. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-copper-500 via-copper-300 to-copper-400"
    />
  )
}

/**
 * Navegação lateral por pontos (telas grandes): mostra em que seção o
 * visitante está e permite pular para qualquer uma.
 */
export function SideNav() {
  const [active, setActive] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    nav.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <nav
      aria-label="Seções"
      className={`fixed top-1/2 left-5 z-40 hidden -translate-y-1/2 transition-opacity duration-700 2xl:block ${visible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
    >
      <ul className="flex flex-col gap-3">
        {nav.map((item) => {
          const on = active === item.id
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollToId(item.id)}
                className="group flex items-center gap-3"
                aria-label={`Ir para ${item.label}`}
                aria-current={on ? 'true' : undefined}
              >
                <span
                  className={`block h-2.5 rounded-full ring-1 ring-forest-950/20 transition-all duration-500 ease-cinema ${
                    on ? 'w-7 bg-copper-400' : 'w-2.5 bg-sand-300/80 group-hover:bg-copper-300'
                  }`}
                />
                <span
                  className={`rounded-full bg-forest-950/85 px-2.5 py-1 text-[0.7rem] font-medium text-sand-50 backdrop-blur transition-all duration-300 ${
                    on ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
