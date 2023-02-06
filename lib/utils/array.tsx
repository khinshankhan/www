// https://stackoverflow.com/a/57748845
export const braidArrays = <T,>(...arrays: T[][]) => {
  const braided: T[] = [];
  for (let i = 0; i < Math.max(...arrays.map((a) => a.length)); i++) {
    arrays.forEach((array) => {
      if (array[i] !== undefined) braided.push(array[i]);
    });
  }
  return braided;
};

// useful for forcing filter types to remove null and undefined
export const existPredicate = <T,>(item: T | undefined | null): item is T => {
  return item !== null && item !== undefined;
};

export const uniquePredicate = <T,>(item: T, index: number, array: T[]) => {
  return array.indexOf(item) === index;
};
