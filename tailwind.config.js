import {skeleton, contentPath} from '@skeletonlabs/skeleton/plugin'
import * as themes from '@skeletonlabs/skeleton/themes'

export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    contentPath(import.meta.url, 'svelte')
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'base', // only generate global styles
    }),
    skeleton({
        // NOTE: each theme included will increase the size of your CSS bundle
        themes: [ themes.cerberus, themes.rose, themes.crimson ]
    })
  ]
}