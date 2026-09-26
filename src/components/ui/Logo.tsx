import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Mənbə fayl `public/logo/logo.jpeg`-dir. Onun 77%-i boş sahə idi və JPEG
 * fonu (#F7F5F6) ağ header-də boz düzbucaqlı kimi görünürdü, ona görə
 * kəsilmiş və şəffaf fonlu `logo.png` hazırlandı.
 *
 * `logo-light.png` tünd fon (footer) üçündür: nişan eyni qalır, "Next Stage"
 * yazısı ağ, "ACADEMY" isə açıq bənövşəyidir. `tone="auto"` hər ikisini
 * render edir və tünd rejimdə açıq variantı göstərir.
 */
export function Logo({
  className,
  tone = 'dark',
}: {
  className?: string
  tone?: 'dark' | 'light' | 'auto'
}) {
  if (tone === 'auto') {
    return (
      <>
        <Logo className={cn('dark:hidden', className)} />
        <Logo tone="light" className={cn('hidden dark:block', className)} />
      </>
    )
  }

  return (
    <Image
      src={tone === 'light' ? '/logo/logo-light.png' : '/logo/logo.png'}
      alt="NextStage Academy"
      width={333}
      height={160}
      // Header-dəki logo ilk ekrandadır; footer-dəki isə aşağıdadır.
      priority={tone === 'dark'}
      className={cn('h-10 w-auto', className)}
    />
  )
}
