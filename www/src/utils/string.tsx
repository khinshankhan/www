export const upperFirst = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const capitalize = (s: string, splitter = ` `, rejoin = ` `) =>
  s.toLowerCase().split(splitter).map(upperFirst).join(rejoin);
