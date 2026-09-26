/** Seçilmiş tema `localStorage`-da bu açarla saxlanır. */
export const THEME_STORAGE_KEY = 'theme'

/**
 * `<head>`-də, səhifə çəkilməzdən əvvəl işləyir: istifadəçi əvvəl tünd
 * rejimi seçibsə `dark` klassını dərhal qoyur, ağ ekran yanıb-sönmür.
 * Defolt açıq rejimdir — sistem ayarına baxmırıq.
 */
export const THEME_INIT_SCRIPT = `try{if(localStorage.getItem('${THEME_STORAGE_KEY}')==='dark')document.documentElement.classList.add('dark')}catch(e){}`

/**
 * Skrol animasiyaları üçün `js-reveal` klassını qoyur (bax: globals.css).
 * Ehtiyat: React 4 saniyəyə hidratasiya olmasa klass götürülür ki, məzmun
 * gizli qalmasın.
 */
export const REVEAL_INIT_SCRIPT = `(function(d){d.classList.add('js-reveal');setTimeout(function(){if(!window.__revealReady)d.classList.remove('js-reveal')},4000)})(document.documentElement)`
