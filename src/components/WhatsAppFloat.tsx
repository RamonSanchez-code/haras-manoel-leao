import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { whatsappUrl } from '../lib/links'
import { WhatsAppIcon } from './ui/icons'

/** Botão flutuante: aparece após o hero e se esconde sobre a seção de contato. */
export function WhatsAppFloat() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let inContact = false
    const contact = document.getElementById('contato')
    const io = contact
      ? new IntersectionObserver(([e]) => {
          inContact = e.isIntersecting
          update()
        }, { threshold: 0.25 })
      : null
    if (contact) io?.observe(contact)
    function update() {
      setShow(window.scrollY > window.innerHeight * 0.6 && !inContact)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      io?.disconnect()
      window.removeEventListener('scroll', update)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com o Haras pelo WhatsApp"
          className="group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-4 text-forest-950 shadow-[0_14px_30px_-10px_rgb(0_0_0/0.45)] sm:right-6 sm:bottom-6"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          <WhatsAppIcon size={26} />
          <span className="max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap transition-all duration-500 group-hover:max-w-40 group-focus-visible:max-w-40">
            Fale conosco
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
