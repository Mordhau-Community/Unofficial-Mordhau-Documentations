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

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // Layout wraps every route, so the overlay scrollbar is mounted once
      // here rather than per page.
      'layout-bottom': () => h(Scrollbar)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
