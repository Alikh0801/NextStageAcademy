/** Seçilmiş tema `localStorage`-da bu açarla saxlanır. */
export const THEME_STORAGE_KEY = 'theme'

/**
 * `<head>`-də, səhifə çəkilməzdən əvvəl işləyir: istifadəçi əvvəl tünd
 * rejimi seçibsə `dark` klassını dərhal qoyur, ağ ekran yanıb-sönmür.
 * Defolt açıq rejimdir — sistem ayarına baxmırıq.
 */
export const THEME_INIT_SCRIPT = `try{if(localStorage.getItem('${THEME_STORAGE_KEY}')==='dark')document.documentElement.classList.add('dark')}catch(e){}`
