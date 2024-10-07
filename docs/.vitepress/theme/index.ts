import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import MyHome from './MyHome.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('MyHome', MyHome)
  }
} satisfies Theme