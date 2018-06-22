// @flow

/**
 * Get the percentage of a number
 * @param  {Number} numerator   Top part of fraction
 * @param  {Number} denominator Bottom part of fraction
 * @return {Number}             Percentage calculated
 */
export default function getPercentage(
  numerator: number = 0,
  denominator: number = 0
) : number {
  const percentage = Math.abs(numerator / denominator) * 100;

  return (percentage < 0.5 && percentage !== 0) ? percentage.toFixed(2) : Math.round(percentage);
}
