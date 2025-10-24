export interface GroupSegment {
  type: "paren" | "text"
  raw: string
  value: string
}

const GROUP_SEGMENT_REGEX = /(\([^)]*\))|([^()]+)/g

export function segmentText(input: string): GroupSegment[] {
  const out: GroupSegment[] = []

  for (const [, paren, text] of input.matchAll(GROUP_SEGMENT_REGEX)) {
    if (paren) {
      out.push({ type: "paren", raw: paren, value: paren.slice(1, -1) })
    } else if (text) {
      const v = text.trim()
      if (v) {
        out.push({ type: "text", raw: v, value: v })
      }
    }
  }

  return out
}
