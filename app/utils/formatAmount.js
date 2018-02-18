// @flow

export type FormattedAmount = {
  text: string,
  isNegative: boolean,
};

export default function formatAmount(amount: number, showSign: boolean = true): FormattedAmount {
  const isNegative = amount < 0;
  const formatValue = Math.abs(amount).toLocaleString('en-us', {
    style: 'currency',
    currency: 'USD',
  });

  return {
    text: `${isNegative && showSign ? '-' : ''}${formatValue}`,
    isNegative,
  };
}

export const formatPercent = (percent, precision = 2): String => {
  console.log(percent);
  const p = Math.round(percent * 100 * precision) / precision;
  return `${p}%`
}
