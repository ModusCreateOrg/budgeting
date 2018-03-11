// @flow

export type FormattedAmount = {
  text: string,
  isNegative: boolean,
};

export default function formatAmount(
  amount: number,
  showSign: boolean = true,
  style: 'currency' | 'percent' = 'currency'
): FormattedAmount {
  const isNegative = amount < 0;
  const formatValue = Math.abs(amount).toLocaleString('en-us', {
    style,
    currency: 'USD',
  });

  return {
    text: `${isNegative && showSign ? '-' : ''}${formatValue}`,
    isNegative,
  };
}
