// @flow

export type Percentage = {
  value: number,
  formattedText: string,
};

export default function calculatePercentage(amount: number, total: number): FormattedAmount {
  const isNegative = amount < 0;
  const percentage = Math.abs((amount * 100) / total);

  return {
    value: percentage,
    formattedText: `${isNegative ? '-' : '+'}${percentage.toFixed(2)}%`,
  };
}
