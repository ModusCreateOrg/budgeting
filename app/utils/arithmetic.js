// @flow
/**
 * Rounds up a value up to the specified decimal places
 */
export const roundUp = (value: number, places: number) =>
  value !== 0 ? parseFloat(Math.round(value * 10 ** places) / 10 ** places).toFixed(places) : 0;

export default { roundUp };
