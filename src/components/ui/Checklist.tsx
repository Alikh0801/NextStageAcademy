import { CircleCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

/** İşarəli siyahı. `columns` ilə sm-dən yuxarı iki sütuna bölünür. */
export function Checklist({ items, columns = false }: { items: string[]; columns?: boolean }) {
  return (
    <ul className={cn('grid gap-3', columns && 'sm:grid-cols-2 sm:gap-x-6')}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-ink-700 dark:text-ink-200">
          <CircleCheck
            className="mt-0.5 size-5 shrink-0 text-brand-500 dark:text-brand-300"
            aria-hidden
          />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}
