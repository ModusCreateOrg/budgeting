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

export function formatPercentageAmount(amount: number, inflow: number, outflow: number): FormattedAmount {
  const isNegative = amount < 0;
  const totalValue = isNegative ? outflow : inflow;
  const formatValue = (Math.abs(amount) / totalValue * 100).toFixed(2);

  const totalValueText = isNegative
    ? `${formatAmount(outflow).text} (outflow)`
    : `${formatAmount(inflow).text} (inflow)`;

  return {
    text: `${isNegative ? '-' : '+'}${formatValue}% of ${totalValueText}`,
    isNegative,
  };
}
