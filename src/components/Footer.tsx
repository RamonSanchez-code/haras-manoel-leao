import { ArrowUp, MapPin } from 'lucide-react'
import { brand, contact, footer, location, nav, openingHours } from '../data/site'
import { scrollToId, whatsappUrl } from '../lib/links'
import { Logo } from './Logo'
import { InstagramIcon, Ornament, WhatsAppIcon } from './ui/icons'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="relative bg-forest-950 text-sand-100/75">
      <div className="mx-auto max-w-7xl px-5 pt-20 pb-10 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">{footer.about}</p>
            <div className="mt-6 flex gap-3">
              <a href={contact.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram do Haras Manoel Leão" className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-sand-50/20 transition hover:bg-copper-400 hover:text-forest-950 hover:ring-copper-400">
                <InstagramIcon size={18} />
              </a>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp do Haras Manoel Leão" className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-sand-50/20 transition hover:bg-copper-400 hover:text-forest-950 hover:ring-copper-400">
                <WhatsAppIcon size={18} />
              </a>
            </div>
          </div>

          <nav aria-label="Rodapé" className="lg:col-span-3 lg:col-start-6">
            <h2 className="text-xs font-semibold tracking-[0.25em] text-copper-300 uppercase">Navegue</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} onClick={(e) => (e.preventDefault(), scrollToId(n.id))} className="transition hover:text-sand-50">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4 lg:col-start-9">
            <h2 className="text-xs font-semibold tracking-[0.25em] text-copper-300 uppercase">Visite</h2>
            <address className="mt-5 flex gap-3 text-sm not-italic">
              <MapPin size={18} className="shrink-0 text-copper-300" aria-hidden />
              <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sand-50">
                {location.street}
                <br />
                {location.city} - {location.state}
              </a>
            </address>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center gap-3 text-sm hover:text-sand-50">
              <WhatsAppIcon size={18} className="text-copper-300" /> {contact.phone || 'Fale pelo WhatsApp'}
            </a>
            <a href={contact.instagram.url} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-3 text-sm hover:text-sand-50">
              <InstagramIcon size={18} className="text-copper-300" /> {contact.instagram.handle}
            </a>
            <ul className="mt-5 space-y-1 text-xs text-sand-100/60">
              {openingHours.map((h) => (
                <li key={h.days}>
                  {h.days}: <span className="text-sand-100/85">{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Ornament className="mt-16 text-copper-400/60" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-sand-100/50 sm:flex-row">
          <p>
            © {year} {footer.legalName || brand.name}
            {footer.cnpj && ` · CNPJ ${footer.cnpj}`}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacidade/" className="hover:text-sand-50">Política de Privacidade</a>
            <button type="button" onClick={() => scrollToId('inicio')} className="flex items-center gap-1.5 hover:text-sand-50">
              Voltar ao topo <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
