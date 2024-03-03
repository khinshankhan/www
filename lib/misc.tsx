export function letterToMobileKey(letter: string) {
  letter = letter.toUpperCase()

  if (letter < "A" || letter > "Z") {
    return { key: -1, count: -1 }
  }

  // Get ASCII values for math
  const asciiA = "A".charCodeAt(0)
  let asciiLetter = letter.charCodeAt(0)

  // Adjust value for first key with 4 characters (7)
  let asciiLetterFixed = asciiLetter
  if (letter >= "S") {
    asciiLetterFixed--
  }
  // Adjust value for second key with 4 characters (9)
  if (letter === "Z") {
    asciiLetterFixed--
  }

  let key = Math.floor((asciiLetterFixed - asciiA) / 3) + 2
  let count = ((asciiLetterFixed - asciiA) % 3) + 1

  if (letter === "S" || letter === "Z") {
    count = 4
  }

  return { key, count }
}

export function mobileKeyToLetter(key: number, count: number) {
  if (key < 2 || key > 9 || count < 1 || count > 4) {
    return ""
  }

  // Get ASCII values for math
  const asciiA = "A".charCodeAt(0)
  let asciiLetter = asciiA + (key - 2) * 3 + count - 1

  // Adjust value for keys with 4 characters
  if (key >= 8) {
    asciiLetter++
  }

  return String.fromCharCode(asciiLetter)
}

export function wordToMobileKey(word: string, repeat: boolean = false, separator: string = " ") {
  return word
    .split("")
    .map((letter) => letterToMobileKey(letter))
    .map(({ key, count }) =>
      `${key !== -1 ? key : separator}`.repeat(!repeat ? 1 : count === -1 ? 1 : count)
    )
    .join("")
}
