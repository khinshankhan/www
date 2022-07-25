// https://bobbyhadz.com/blog/javascript-check-if-date-is-within-24-hours
export const isDateClose = (d1: Date, d2: Date, hours = 0) => {
  const msBetweenDates = Math.abs(d2.getTime() - d1.getTime());
  const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
  return hours > hoursBetweenDates;
};

export const checkIfRecent = (d: Date, t?: Date) => {
  const today = t || new Date();
  return isDateClose(today, d, 72);
};
