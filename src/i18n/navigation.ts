import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

/**
 * Bu `Link` və `redirect` funksiyalarını next/link əvəzinə işlət —
 * yolları aktiv dilə görə avtomatik tərcümə edirlər.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
