export const singleSlashRegex = /\/\/+/g;

// remove all single slashes from a string
export const removeSingleSlashes = (str: string) => str.replace(singleSlashRegex, ``);
