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
  const formatValue = percent.toLocaleString('en-us', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatValue
}
