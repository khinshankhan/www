export function existPredicate<T>(item: T | undefined | null): item is T {
  return item !== null && item !== undefined
}
