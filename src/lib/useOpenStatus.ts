import { useEffect, useState } from 'react'
import { openingHours } from '../data/site'

const DAY_NAMES = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']
const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}
const fmt = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return m ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`
}

/** Dia da semana e minutos atuais no fuso de Brasília. */
function nowInBrasilia() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) }
}

export const hoursFor = (day: number) => openingHours.find((h) => h.weekdays.includes(day))

export interface OpenStatus {
  open: boolean
  label: string
}

export function computeOpenStatus(): OpenStatus {
  const { day, minutes } = nowInBrasilia()
  const today = hoursFor(day)
  if (today && minutes >= toMin(today.open) && minutes < toMin(today.close)) {
    return { open: true, label: `Aberto agora · fecha às ${fmt(today.close)}` }
  }
  if (today && minutes < toMin(today.open)) {
    return { open: false, label: `Fechado · abre hoje às ${fmt(today.open)}` }
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7
    const h = hoursFor(d)
    if (h) return { open: false, label: `Fechado · abre ${i === 1 ? 'amanhã' : DAY_NAMES[d]} às ${fmt(h.open)}` }
  }
  return { open: false, label: 'Consulte o horário' }
}

/** Status "aberto agora", atualizado a cada minuto. */
export function useOpenStatus() {
  const [status, setStatus] = useState<OpenStatus>(computeOpenStatus)
  useEffect(() => {
    const t = setInterval(() => setStatus(computeOpenStatus()), 60_000)
    return () => clearInterval(t)
  }, [])
  return status
}
