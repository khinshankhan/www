// https://bobbyhadz.com/blog/javascript-check-if-date-is-within-24-hours
export const isDateClose = (date: Date, benchmarkDate: Date, hours = 24) => {
  const msBetweenDates = Math.abs(benchmarkDate.getTime() - date.getTime());
  const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
  return hours > hoursBetweenDates;
};
