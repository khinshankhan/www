export const chopOffWord = (word: string, suffix: boolean) => (s: string) =>
  suffix ? s.slice(0, word.length * -1) : s.slice(word.length)
