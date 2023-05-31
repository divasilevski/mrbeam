import colors from './palette'

const meta = {
  title: 'MrBeam',
  description: 'MrBeam - blazingly fast beam calculator.',
  domain: 'mrbeam.app',
  url: 'https://mrbeam.app',
}

export default [
  // Main
  { name: 'description', content: meta.description },
  { name: 'theme-color', content: colors.background },

  // Facebook Meta Tags
  { property: 'og:url', content: meta.url },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: meta.title },
  { property: 'og:description', content: meta.description },
  { property: 'og:image', content: `${meta.url}/og.png` },

  // Twitter Meta Tags
  { name: 'twitter:card', content: 'summary_large_image' },
  { property: 'twitter:domain', content: meta.domain },
  { property: 'twitter:url', content: meta.url },
  { name: 'twitter:title', content: meta.title },
  { name: 'twitter:description', content: meta.description },
  { name: 'twitter:image', content: `${meta.url}/og.png` },

  // other
  {
    name: 'apple-mobile-web-app-capable',
    content: 'yes',
  },
  {
    name: 'apple-mobile-web-app-status-bar-style',
    content: 'white-translucent',
  },
]
