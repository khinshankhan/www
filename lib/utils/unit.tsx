interface GetSizePartsProps {
  size?: number | string
  unit?: string
  fallbackSize?: number | string
}

export function getSizeParts({
  size,
  unit = "px", // unit could just be a number, idc use px as default
  fallbackSize = 50,
}: GetSizePartsProps): { size: number; unit: string } {
  if (typeof size === "number") {
    return { size, unit }
  }

  if (size === undefined) {
    return getSizeParts({ size: fallbackSize, unit, fallbackSize })
  }

  // matches consecutive number, then the rest is the second capture group
  const re = /([-0-9]+)(.*)/g
  // @ts-ignore
  const parts = [...size.matchAll(re)][0] // only interested in the 0th group

  const sizeNumber = Number(parts[1])
  const sizeUnit = parts[2].toString()
  return {
    size: sizeNumber,
    unit: sizeUnit === "" ? sizeUnit : unit,
  }
}
