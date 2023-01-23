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
