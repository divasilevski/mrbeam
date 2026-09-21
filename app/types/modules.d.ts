declare module '*.md' {
  // "unknown" would be more detailed depends on how you structure frontmatter
  const attributes: Record<string, unknown>

  // When "Mode.Vue" is requested
  import type { ComponentOptions } from 'vue'
  const VueComponent: ComponentOptions

  // Modify below per your usage
  export { attributes, VueComponent }
}
