import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { contact, contactSection } from '../data/site'
import { FORM_ENDPOINT, hasWhatsAppNumber, PREFILL_EVENT, whatsappUrl } from '../lib/links'
import { InstagramIcon, WhatsAppIcon } from './ui/icons'
import { Reveal } from './ui/Reveal'

type Fields = { name: string; phone: string; subject: string; message: string; consent: boolean; company: string }
type Errors = Partial<Record<keyof Fields, string>>
type State = { kind: 'idle' } | { kind: 'sending' } | { kind: 'success'; text: string } | { kind: 'error'; text: string }

const empty: Fields = { name: '', phone: '', subject: '', message: '', consent: false, company: '' }

function maskPhone(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = 'Informe seu nome.'
  const digits = f.phone.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 11) e.phone = 'Informe um telefone com DDD.'
  if (!f.subject) e.subject = 'Escolha um assunto.'
  if (f.message.trim().length < 10) e.message = 'Conte um pouco mais (mínimo de 10 caracteres).'
  if (!f.consent) e.consent = 'É preciso concordar para enviarmos sua mensagem.'
  return e
}

function composeMessage(f: Fields) {
  return `Olá! Vim pelo site do Haras Manoel Leão.\n\n*Nome:* ${f.name.trim()}\n*Telefone:* ${f.phone}\n*Assunto:* ${f.subject}\n\n${f.message.trim()}`
}

export function Contact() {
  const uid = useId()
  const [f, setF] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState(false)
  const [state, setState] = useState<State>({ kind: 'idle' })

  // Pré-seleciona assunto quando outra seção chama o formulário
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const subject = (e as CustomEvent<string>).detail
      if (contactSection.subjects.includes(subject)) setF((p) => ({ ...p, subject }))
    }
    window.addEventListener(PREFILL_EVENT, onPrefill)
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill)
  }, [])

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    const next = { ...f, [k]: v }
    setF(next)
    if (touched) setErrors(validate(next))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setTouched(true)
    const errs = validate(f)
    setErrors(errs)
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0]
      document.getElementById(`${uid}-${first}`)?.focus()
      return
    }
    if (f.company) return // honeypot anti-spam

    const text = composeMessage(f)

    if (FORM_ENDPOINT) {
      setState({ kind: 'sending' })
      const ctrl = new AbortController()
      const timer = setTimeout(() => ctrl.abort(), 15000)
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ nome: f.name, telefone: f.phone, assunto: f.subject, mensagem: f.message, origem: 'site' }),
          signal: ctrl.signal,
        })
        if (!res.ok) throw new Error(String(res.status))
        setState({ kind: 'success', text: 'Mensagem enviada! A equipe do Haras vai retornar pelo telefone informado.' })
        setF(empty)
        setTouched(false)
      } catch {
        setState({ kind: 'error', text: 'Não foi possível enviar agora. Tente novamente ou fale direto pelo WhatsApp.' })
      } finally {
        clearTimeout(timer)
      }
      return
    }

    // Sem endpoint: envia pelo WhatsApp
    if (hasWhatsAppNumber) {
      window.open(whatsappUrl(text), '_blank', 'noopener')
      setState({ kind: 'success', text: 'Abrimos o WhatsApp com sua mensagem pronta — é só tocar em enviar.' })
      return
    }
    let copied = false
    try {
      await navigator.clipboard.writeText(text)
      copied = true
    } catch {
      /* clipboard indisponível */
    }
    window.open(whatsappUrl(), '_blank', 'noopener')
    setState({
      kind: 'success',
      text: copied
        ? 'Abrimos o WhatsApp do Haras e copiamos sua mensagem — cole na conversa e envie.'
        : 'Abrimos o WhatsApp do Haras. Envie sua mensagem por lá.',
    })
  }

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-700">
        <AlertCircle size={14} aria-hidden /> {errors[k]}
      </p>
    ) : null
  const aria = (k: keyof Fields) => ({
    id: `${uid}-${k}`,
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${uid}-${k}-err` : undefined,
  })

  return (
    <section id="contato" className="relative overflow-hidden bg-forest-900 py-24 text-sand-50 sm:py-32 wood grain">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgb(207_155_99/0.22),transparent_60%)]" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-copper-300">Contato</p>
            <h2 className="mt-5 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] font-medium">{contactSection.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-sand-100/75">{contactSection.lead}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 flex flex-col gap-3">
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-forest-950 hover:brightness-105">
              <WhatsAppIcon size={20} /> Conversar no WhatsApp
            </a>
            <a href={contact.instagram.url} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <InstagramIcon size={18} /> {contact.instagram.handle}
            </a>
            {contact.phone && (
              <a href={`tel:${contact.phone.replace(/\D/g, '')}`} className="btn-ghost">
                {contact.phone}
              </a>
            )}
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="btn-ghost">
                {contact.email}
              </a>
            )}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <form noValidate onSubmit={onSubmit} className="rounded-[2rem] bg-sand-50 p-6 text-forest-900 shadow-2xl shadow-black/30 sm:p-10" aria-describedby={`${uid}-status`}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor={`${uid}-name`} className="mb-1.5 block text-sm font-semibold">Nome</label>
                <input {...aria('name')} className="field" autoComplete="name" value={f.name} onChange={(e) => set('name', e.target.value)} placeholder="Seu nome" />
                {err('name')}
              </div>
              <div>
                <label htmlFor={`${uid}-phone`} className="mb-1.5 block text-sm font-semibold">Telefone / WhatsApp</label>
                <input {...aria('phone')} className="field" type="tel" inputMode="tel" autoComplete="tel-national" value={f.phone} onChange={(e) => set('phone', maskPhone(e.target.value))} placeholder="(16) 90000-0000" />
                {err('phone')}
              </div>
              <div>
                <label htmlFor={`${uid}-subject`} className="mb-1.5 block text-sm font-semibold">Assunto de interesse</label>
                <select {...aria('subject')} className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%235a3e2b%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[right_1rem_center] bg-no-repeat pr-10" value={f.subject} onChange={(e) => set('subject', e.target.value)}>
                  <option value="">Selecione…</option>
                  {contactSection.subjects.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {err('subject')}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor={`${uid}-message`} className="mb-1.5 block text-sm font-semibold">Mensagem</label>
                <textarea {...aria('message')} className="field min-h-32 resize-y" value={f.message} onChange={(e) => set('message', e.target.value)} placeholder="Conte o que você gostaria de saber: data da visita, número de pessoas, tipo de evento…" />
                {err('message')}
              </div>
              {/* Honeypot (oculto para pessoas) */}
              <div className="hidden" aria-hidden>
                <label>Empresa<input tabIndex={-1} autoComplete="off" value={f.company} onChange={(e) => set('company', e.target.value)} /></label>
              </div>
              <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-start gap-3 text-sm text-forest-900/75">
                  <input {...aria('consent')} type="checkbox" checked={f.consent} onChange={(e) => set('consent', e.target.checked)} className="mt-0.5 h-5 w-5 shrink-0 accent-forest-800" />
                  <span>
                    Concordo em ser contatado(a) pelo Haras sobre esta solicitação, conforme a{' '}
                    <a href="/privacidade/" className="font-semibold underline underline-offset-2 hover:text-copper-600">Política de Privacidade</a>.
                  </span>
                </label>
                {err('consent')}
              </div>
            </div>

            <button type="submit" disabled={state.kind === 'sending'} className="btn-dark mt-8 w-full disabled:opacity-60">
              {state.kind === 'sending' ? <Loader2 size={18} className="animate-spin" /> : FORM_ENDPOINT ? <Send size={18} /> : <WhatsAppIcon size={18} />}
              {state.kind === 'sending' ? 'Enviando…' : FORM_ENDPOINT ? 'Enviar mensagem' : 'Enviar pelo WhatsApp'}
            </button>

            <div id={`${uid}-status`} aria-live="polite" className="min-h-0">
              <AnimatePresence>
                {(state.kind === 'success' || state.kind === 'error') && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-5 flex items-start gap-2 rounded-xl px-4 py-3 text-sm ${state.kind === 'success' ? 'bg-forest-700/10 text-forest-800' : 'bg-red-50 text-red-800'}`}
                  >
                    {state.kind === 'success' ? <CheckCircle2 size={18} className="shrink-0" /> : <AlertCircle size={18} className="shrink-0" />}
                    <span>
                      {state.text}{' '}
                      {state.kind === 'error' && (
                        <a href={whatsappUrl(composeMessage(f))} target="_blank" rel="noopener noreferrer" className="font-semibold underline">Abrir WhatsApp</a>
                      )}
                    </span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
