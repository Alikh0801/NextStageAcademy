/**
 * Excel ikonu — Lucide üslubunda çəkilib (24×24, 2px xətt, `currentColor`),
 * ona görə yanındakı Lucide ikonları ilə eyni ağırlıqda və rəngdə görünür.
 * Forma Excel-in tanınan quruluşunu saxlayır: arxada cədvəl vərəqi, qabaqda
 * "X" olan kvadrat. Rəsmi rəngli loqo xətti ikonların arasında yad dururdu.
 */
export function ExcelIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {/* Cədvəl vərəqi — sol kənarı kvadratın arxasında qalır */}
      <path d="M8 7V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-1" />
      <path d="M15 4v16" />
      <path d="M15 9.5h5" />
      <path d="M15 14.5h5" />

      {/* Qabaqdakı dolu kvadrat və ağ "X" */}
      <rect x="2.5" y="6.5" width="11" height="11" rx="2" fill="currentColor" stroke="none" />
      <path d="m5.75 9.75 4.5 4.5" stroke="#fff" />
      <path d="m10.25 9.75-4.5 4.5" stroke="#fff" />
    </svg>
  )
}
