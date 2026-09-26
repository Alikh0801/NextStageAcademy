'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

declare global {
  interface Window {
    __revealReady?: boolean
  }
}

/**
 * Bütün sayt üçün iki kiçik davranış:
 *  - `data-reveal` elementləri ekrana girəndə `data-revealed` alır;
 *  - səhifə skrol ediləndə `<html data-scrolled>` qoyulur (header kölgəsi).
 * Heç nə render etmir. Səhifə dəyişəndə yeni elementləri yenidən izləyir.
 */
export function MotionEffects() {
  const pathname = usePathname()

  useEffect(() => {
    window.__revealReady = true

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-revealed', '')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    )

    document
      .querySelectorAll('[data-reveal]:not([data-revealed])')
      .forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [pathname])

  useEffect(() => {
    const root = document.documentElement
    const onScroll = () => root.toggleAttribute('data-scrolled', window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return null
}
