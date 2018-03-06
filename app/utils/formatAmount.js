// @flow

export type FormattedAmount = {
  text: string,
  isNegative: boolean,
};

export default function formatAmount(
  amount: number,
  showSign: boolean = true,
  formatStyle: string = 'currency'
): FormattedAmount {
  const isNegative = amount < 0;
  const formatValue = Math.abs(amount).toLocaleString('en-us', {
    style: formatStyle,
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  return {
    text: `${isNegative && showSign ? '-' : ''}${formatValue}`,
    isNegative,
  };
}
