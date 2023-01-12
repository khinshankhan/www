export const createProperties = <
  Property extends string,
  Values extends readonly string[],
  Value extends Values[number]
>(
  property: Property,
  values: Values
) =>
  values.reduce(
    (stored, current) => ({
      ...stored,
      [current as Value]: { [property]: current as Value },
    }),
    {} as Record<Value, Record<Property, Value>>
  );
