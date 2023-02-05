import type { String } from "ts-toolbelt";

export function changeObjectKeys<
  T extends string,
  U extends string,
  V extends string,
  W,
  NewKeys extends String.Replace<T, U, V>
>(obj: Record<T, W>, originalToken: U, newToken: V) {
  const newObj = {} as Record<NewKeys, W>;

  Object.keys(obj).forEach((key) => {
    const newKey = key.replace(originalToken, newToken) as NewKeys;
    newObj[newKey] = obj[key as T];
  });

  return newObj;
}
