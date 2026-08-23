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
import Scrollbar from './Scrollbar.vue'
import Landing from './Landing.vue'
import Prefs from './Prefs.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // Layout wraps every route, so the overlay scrollbar is mounted once
      // here rather than per page.
      'layout-bottom': () => h(Scrollbar),
      // Slot renders past the social links; style.css reorders the flex
      // row so the button lands beside the appearance switch.
      'nav-bar-content-after': () => h(Prefs)
    })
  },
  enhanceApp({ app }) {
    // VitePress hands any unrecognised `layout:` value straight to
    // <component :is>, so registering this globally is what makes
    // `layout: Landing` in docs/en/index.md resolve.
    app.component('Landing', Landing)

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
