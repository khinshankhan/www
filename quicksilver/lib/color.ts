export type DocumentTheme = "light" | "dark"

/** Reads the current document theme from the root class list. */
export function getDocumentTheme(): DocumentTheme {
  if (typeof document === "undefined") return "light"
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

/** Reads a CSS custom property from the root element. */
export function getTokenValue(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback
  const value = window.getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || fallback
}

function probe(property: "color" | "background", value: string) {
  const el = document.createElement("div")
  el.style[property] = value
  el.style.position = "fixed"
  el.style.opacity = "0"
  el.style.pointerEvents = "none"
  document.body.append(el)

  const styles = window.getComputedStyle(el)
  const resolved = property === "color" ? styles.color : styles.backgroundColor
  el.remove()
  return resolved
}

function paintToRgba(fills: string[], fallback: string) {
  const canvas = document.createElement("canvas")
  canvas.width = 1
  canvas.height = 1

  const context = canvas.getContext("2d")
  if (!context) return fallback

  context.clearRect(0, 0, 1, 1)
  for (const fill of fills) {
    context.fillStyle = fill
    context.fillRect(0, 0, 1, 1)
  }

  const [red, green, blue, alpha] = context.getImageData(0, 0, 1, 1).data
  return `rgba(${red ?? 0}, ${green ?? 0}, ${blue ?? 0}, ${Number(
    ((alpha ?? 255) / 255).toFixed(3)
  )})`
}

/** Resolves a CSS color expression, including vars and color-mix(). */
export function resolveColor(value: string, fallback: string) {
  if (typeof window === "undefined") return fallback
  return probe("background", value) || fallback
}

/** Resolves a CSS color expression to concrete rgba() for canvas/SVG consumers. */
export function resolveCssColor(value: string, fallback: string) {
  if (typeof window === "undefined") return fallback
  const resolved = probe("color", value)
  if (!resolved) return fallback
  return paintToRgba([resolved], resolved)
}

/** Flattens foreground over background. */
export function blendColors(foreground: string, background: string, fallback: string) {
  if (typeof window === "undefined") return fallback
  return paintToRgba([background, foreground], fallback)
}

// Keep these in sync with the theme tokens used by the embed shell.
const EMBED_FALLBACK_BACKGROUND = { dark: "#161634", light: "#f5f5fb" } as const

/** Resolves the flattened color of the embed shell surface. */
export function resolveEmbedShellBackground(theme: DocumentTheme) {
  const fallback = EMBED_FALLBACK_BACKGROUND[theme]
  if (typeof window === "undefined") return fallback

  const foreground = getTokenValue("--background-1", fallback)
  const background = getTokenValue("--background-2", fallback)
  const shell = resolveColor(`color-mix(in oklab, ${foreground} 60%, transparent)`, foreground)
  return blendColors(shell, background, foreground)
}
