import type { CSSProperties } from 'react'

/**
 * Skrolda üzə çıxan element üçün atributlar. `index` verilərsə gecikmə
 * ardıcıl artır — siyahı elementləri bir-birinin ardınca görünür.
 *
 *   <li {...reveal(i)}>…</li>
 */
export function reveal(index = 0, step = 80) {
  return {
    'data-reveal': '',
    style: { '--reveal-delay': `${index * step}ms` } as CSSProperties,
  }
}

/** Səhifə açılanda (skroldan asılı olmayaraq) gecikmə ilə görünən element. */
export function enter(index = 0, step = 110): CSSProperties {
  return { animationDelay: `${index * step}ms` }
}

/** Kartların ortaq hover effekti: yüngülcə qalxır, kölgə və çərçivə güclənir. */
export const CARD_HOVER =
  'transition-[translate,box-shadow,border-color] duration-300 ease-(--ease-smooth) hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-ink-900/10 dark:hover:border-brand-500/30 dark:hover:shadow-black/30'
