import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { contact, nav } from '../data/site'
import { scrollToId, whatsappUrl } from '../lib/links'
import { Logo } from './Logo'
import { InstagramIcon, WhatsAppIcon } from './ui/icons'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const menuBtn = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Destaca a seção visível no menu
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    nav.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  // Menu mobile: trava o scroll, fecha com Esc e mantém o foco dentro
  useEffect(() => {
    if (!open) return
    const trigger = menuBtn.current
    document.body.style.overflow = 'hidden'
    const first = panel.current?.querySelector<HTMLElement>('a,button')
    first?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'Tab' && panel.current) {
        const items = [...panel.current.querySelectorAll<HTMLElement>('a,button')]
        const [f, l] = [items[0], items[items.length - 1]]
        if (e.shiftKey && document.activeElement === f) {
          e.preventDefault()
          l.focus()
        } else if (!e.shiftKey && document.activeElement === l) {
          e.preventDefault()
          f.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      trigger?.focus()
    }
  }, [open])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-cinema ${
        scrolled ? 'bg-forest-950/85 py-3 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.6)] backdrop-blur-xl' : 'bg-transparent py-6'
      }`}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-sand-50 focus:px-4 focus:py-2 focus:text-forest-900"
      >
        Pular para o conteúdo
      </a>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#inicio" onClick={go('inicio')} aria-label="Haras Manoel Leão — início">
          <Logo light />
        </a>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={go(item.id)}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`group relative px-3.5 py-2 text-[0.82rem] font-medium tracking-wide transition-colors ${
                    active === item.id ? 'text-copper-300' : 'text-sand-100/85 hover:text-sand-50'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-copper-400 transition-transform duration-500 ease-cinema ${
                      active === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden min-h-10 px-5 text-xs whitespace-nowrap sm:inline-flex"
          >
            <WhatsAppIcon size={16} /> Fale conosco
          </a>
          <button
            ref={menuBtn}
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full text-sand-50 ring-1 ring-sand-50/25 transition hover:bg-sand-50/10 xl:hidden"
            aria-label="Abrir menu"
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-50 flex h-[100dvh] flex-col bg-forest-950 wood grain xl:hidden"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between px-5 py-6">
              <Logo light />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full text-sand-50 ring-1 ring-sand-50/25"
                aria-label="Fechar menu"
              >
                <X size={22} />
              </button>
            </div>
            <nav aria-label="Menu mobile" className="flex flex-1 flex-col justify-center px-8">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={go(item.id)}
                      className="flex items-baseline gap-4 py-2 font-display text-4xl text-sand-50 transition hover:text-copper-300"
                    >
                      <span className="font-sans text-xs text-copper-400">{String(i + 1).padStart(2, '0')}</span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="flex gap-3 px-8 pb-10">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1">
                <WhatsAppIcon size={18} /> WhatsApp
              </a>
              <a href={contact.instagram.url} target="_blank" rel="noopener noreferrer" className="btn-ghost" aria-label="Instagram do Haras">
                <InstagramIcon size={18} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
