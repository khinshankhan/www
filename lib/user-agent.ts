export function isFirefoxAndroid(userAgent: string) {
  return /\bAndroid\b/i.test(userAgent) && /\bFirefox\//i.test(userAgent)
}
