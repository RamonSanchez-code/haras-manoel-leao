import { Car, Clock, ExternalLink, MapPin, Navigation, Phone } from 'lucide-react'
import { contact, location, openingHours } from '../data/site'
import { directionsUrl, mapEmbedUrl, SHOW_PENDING, wazeUrl } from '../lib/links'
import { OpenBadge } from './ui/OpenBadge'
import { Reveal } from './ui/Reveal'

export function Location() {
  const notes = location.accessNotes.filter((n) => n.status === 'confirmado' || SHOW_PENDING)

  return (
    <section id="localizacao" className="relative bg-sand-50 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">Localização</p>
            <h2 className="mt-5 font-display text-[clamp(2.3rem,4.6vw,4rem)] leading-[1.02] font-medium text-forest-900">
              Planeje sua visita
            </h2>
            <p className="mt-5 text-lg text-forest-900/70">{location.region}.</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 rounded-2xl bg-forest-900 p-6 text-sand-50">
            <address className="flex gap-4 not-italic">
              <MapPin className="mt-1 shrink-0 text-copper-300" size={22} aria-hidden />
              <span>
                <span className="block font-display text-2xl">{location.street}</span>
                <span className="text-sand-100/75">
                  {location.district && `${location.district}, `}
                  {location.city} - {location.state}
                  {location.postalCode && ` · CEP ${location.postalCode}`}
                </span>
              </span>
            </address>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <Navigation size={17} /> Como chegar
              </a>
              <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <ExternalLink size={17} /> Google Maps
              </a>
              <a href={wazeUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost sm:col-span-2 whitespace-nowrap">
                <Car size={17} /> Waze
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/70 p-5 ring-1 ring-sand-200">
              <h3 className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-copper-600 uppercase">
                <Clock size={14} aria-hidden /> Horário
              </h3>
              <OpenBadge dark={false} className="mt-3" />
              <dl className="mt-3 space-y-1.5 text-sm">
                {openingHours.map((h) => (
                  <div key={h.days} className="flex justify-between gap-3">
                    <dt className="text-forest-900/60">{h.days}</dt>
                    <dd className="font-semibold whitespace-nowrap">{h.hours}</dd>
                  </div>
                ))}
              </dl>
            </div>
            {contact.phone && (
              <div className="rounded-2xl bg-white/70 p-5 ring-1 ring-sand-200">
                <h3 className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-copper-600 uppercase">
                  <Phone size={14} aria-hidden /> Telefone / WhatsApp
                </h3>
                <a href={`tel:+55${contact.phone.replace(/\D/g, '')}`} className="mt-3 block font-display text-2xl font-semibold hover:text-copper-600">
                  {contact.phone}
                </a>
                <p className="mt-1 text-xs text-forest-900/55">Horários de feriado podem variar.</p>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.15}>
            <h3 className="mt-8 text-xs font-semibold tracking-[0.25em] text-copper-600 uppercase">Informações de acesso</h3>
            <ul className="mt-4 space-y-3 text-sm text-forest-900/70">
              {notes.map((n) => (
                <li key={n.text} className={`flex gap-3 ${n.status === 'consultar' ? 'text-copper-600' : ''}`}>
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-copper-500" aria-hidden />
                  {n.text}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="relative h-[420px] overflow-hidden rounded-[2rem] bg-sand-200 shadow-[0_30px_60px_-35px_rgb(12_26_19/0.5)] ring-1 ring-sand-300 sm:h-[560px]">
            <iframe
              title={`Mapa: ${location.name}, ${location.street}, ${location.city} - ${location.state}`}
              src={mapEmbedUrl}
              className="h-full w-full border-0 grayscale-[35%] sepia-[15%] transition duration-700 hover:grayscale-0 hover:sepia-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
