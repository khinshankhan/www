// TODO: clean this up someday
export function chopOffWord(word: string, suffix: boolean) {
  return function (s: string) {
    return suffix ? s.slice(0, word.length * -1) : s.slice(word.length)
  }
}
