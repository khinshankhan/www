export const existPredicate = <T,>(item: T | undefined | null): item is T => {
  return item !== null && item !== undefined
}

export const truthyPredicate = <T,>(item: T | false): item is T => {
  return Boolean(item)
}
