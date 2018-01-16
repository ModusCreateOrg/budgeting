/**
 * Returns an unsigned version of number
 * @param {number} value 
 */
export const unsign = (value: number): number => value > 0 ? value : -value

export const roundUp = (value: number, places: number): number => parseFloat(Math.round(value * (10 ** places)) / (10 ** places)).toFixed(places)

