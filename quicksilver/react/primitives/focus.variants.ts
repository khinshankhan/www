/* The single focus-visible treatment for quicksilver, as plain class strings
   so tailwind-merge can compose consumer overrides. Outline-based: follows
   border-radius, needs no offset-background hack, and stays visible over any
   fill. `focusRing` sits outside the element (standalone controls);
   `focusRingInset` draws inside it (elements flush against siblings or
   container edges, e.g. tabs and panels). The explicit `outline-solid` on
   focus-visible is required because `outline-none` poisons
   `--tw-outline-style`. */
export const focusRing =
  "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid focus-visible:outline-stark-contrast"

export const focusRingInset =
  "outline-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-solid focus-visible:outline-stark-contrast"
