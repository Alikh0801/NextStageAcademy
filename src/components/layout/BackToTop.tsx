'use client'

import { useSyncExternalStore } from 'react'
import { useTranslations } from 'next-intl'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Bu qədər skrol ediləndən sonra düymə görünür (px). */
const SHOW_AFTER = 400

const RADIUS = 22
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function subscribe(onChange: () => void) {
  window.addEventListener('scroll', onChange, { passive: true })
  window.addEventListener('resize', onChange)
  return () => {
    window.removeEventListener('scroll', onChange)
    window.removeEventListener('resize', onChange)
  }
}

/**
 * Skrol vəziyyəti bir ədəddə: 0 — düymə gizli, 0-dan böyük — görünür və
 * dəyər oxunma faizidir. Yuvarlaqlaşdırılır ki, hər pikseldə render olmasın.
 */
function getSnapshot(): number {
  const { scrollY, innerHeight } = window
  if (scrollY < SHOW_AFTER) return 0
  const max = document.documentElement.scrollHeight - innerHeight
  const progress = max > 0 ? Math.min(scrollY / max, 1) : 1
  return Math.max(Math.round(progress * 200) / 200, 0.005)
}

const getServerSnapshot = () => 0

export function BackToTop() {
  const t = useTranslations('Common')
  const progress = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const visible = progress > 0

  function scrollToTop() {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={t('backToTop')}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        // Mobil menyudan (z-40) aşağıda qalır ki, menyu açıq olanda örtülsün.
        'group fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-5 z-30 flex size-13 items-center justify-center rounded-full bg-white/90 text-brand-600 shadow-lg shadow-ink-900/15 backdrop-blur-md transition-[opacity,translate,box-shadow] duration-300 ease-(--ease-smooth) hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 sm:right-8 dark:bg-ink-900/90 dark:text-brand-300 dark:shadow-black/40',
        visible ? 'opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      {/* Oxunma göstəricisi: dairə səhifə boyu dolur */}
      <svg aria-hidden viewBox="0 0 52 52" className="absolute inset-0 size-full -rotate-90">
        <circle
          cx="26"
          cy="26"
          r={RADIUS}
          fill="none"
          strokeWidth="2.5"
          className="stroke-ink-100 dark:stroke-white/10"
        />
        <circle
          cx="26"
          cy="26"
          r={RADIUS}
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
          className="stroke-brand-500 transition-[stroke-dashoffset] duration-150 dark:stroke-brand-300"
        />
      </svg>

      <ArrowUp
        className="relative size-5 transition-[translate] duration-300 group-hover:-translate-y-0.5"
        aria-hidden
      />
    </button>
  )
}
