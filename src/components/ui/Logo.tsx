import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Mənbə fayl `public/logo/logo.jpeg`-dir. Onun 77%-i boş sahə idi və JPEG
 * fonu (#F7F5F6) ağ header-də boz düzbucaqlı kimi görünürdü, ona görə
 * kəsilmiş və şəffaf fonlu `logo.png` hazırlandı.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo/logo.png"
      alt="NextStage Academy"
      width={333}
      height={160}
      priority
      className={cn('h-10 w-auto', className)}
    />
  )
}
