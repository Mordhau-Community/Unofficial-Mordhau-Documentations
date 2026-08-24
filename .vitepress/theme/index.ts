// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
// Self hosted so the site does not depend on the Google Fonts CDN, same as
// the Inter that VitePress already bundles. Imported before style.css so the
// font stacks in there win.
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/jetbrains-mono/wght-italic.css'
import './style.css'
import Announce from './Announce.vue'
import Scrollbar from './Scrollbar.vue'
import Landing from './Landing.vue'
import LocaleRedirect from './LocaleRedirect.vue'
import Prefs from './Prefs.vue'
import ReadMode from './ReadMode.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // VitePress offsets its fixed navigation and page layout by the height
      // reserved for this slot. Dismissing the release notice drops that
      // height back to zero through the root data attribute.
      'layout-top': () => h(Announce),
      // Layout wraps every route, so the overlay scrollbar and the read mode
      // button are mounted once here rather than per page. A slot takes an
      // array, which renders the two as siblings.
      'layout-bottom': () => [h(Scrollbar), h(ReadMode)],
      // Slot renders past the social links; style.css reorders the flex
      // row so the button lands beside the appearance switch.
      'nav-bar-content-after': () => h(Prefs)
    })
  },
  enhanceApp({ app }) {
    // VitePress hands any unrecognised `layout:` value straight to
    // <component :is>, so the shared locale landing pages and root redirect
    // are registered globally here.
    app.component('Landing', Landing)
    app.component('LocaleRedirect', LocaleRedirect)

    // Firefox ignores -webkit-user-drag, and honours the draggable attribute
    // instead. One delegated listener covers every image on every route,
    // including any added later, without walking the DOM.
    if (!import.meta.env.SSR) {
      document.addEventListener('dragstart', (event) => {
        const target = event.target as HTMLElement | null
        if (target && target.tagName === 'IMG') event.preventDefault()
      })
    }
  }
} satisfies Theme
