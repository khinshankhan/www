const nums = 100; // whole number, max
const increment = 0.25; // max of 1
const unit = `rem`;
const ratio = 0.25; // 1 -> x units

const space = Array.from(Array(nums / increment + 1).keys())
  .slice(1) // skip 0
  .reduce(
    (stored, curr) => ({
      ...stored,
      [curr * increment]: `${curr * increment * ratio}${unit}`,
    }),
    {
      px: `1px`,
    }
  );

export default space;
