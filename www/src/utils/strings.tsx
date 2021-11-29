export const capitalize = (word: string) =>
  word
    .toLowerCase()
    .split(` `)
    .map((i) => i.charAt(0).toUpperCase() + i.substr(1).toLowerCase())
    .join(` `);

// TODO: enhance this to account for quotes, colons, backquotes etc
export const spaceConsciousSplit = (str: string) => str.split(` `);
