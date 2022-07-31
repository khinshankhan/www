// https://bobbyhadz.com/blog/javascript-check-if-date-is-within-24-hours
export const isDateClose = (date: Date, benchmarkDate: Date, hours = 24) => {
  const msBetweenDates = Math.abs(benchmarkDate.getTime() - date.getTime());
  const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
  return hours > hoursBetweenDates;
};

// sort of based off dan https://github.com/gaearon/overreacted.io/blob/master/src/utils/helpers.js
const minDiv = (min: number, divider: number) => [Math.floor(min / divider), min % divider];
export const minToEmoji = (t: number) => {
  const [bentos, bentosRemainder] = minDiv(t, 30);
  const [riceballs, riceballsRemainder] = minDiv(bentosRemainder, 10);
  const sushi = Math.ceil(riceballsRemainder / 5);

  return `🍱`.repeat(bentos) + `🍙`.repeat(riceballs) + `🍣`.repeat(sushi);
};
