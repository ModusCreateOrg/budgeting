// @flow

export type FormattedAmount = {
  text: string,
  isNegative: boolean,
};

export default function formatAmount(
  amount: number,
  showSign: boolean = true,
  percentage: boolean = false
): FormattedAmount {
  let formatValue = '';
  const isNegative = amount < 0;
  if (percentage) {
    formatValue = `${amount} %`;
  } else {
    formatValue = Math.abs(amount).toLocaleString('en-us', { style: 'currency', currency: 'USD' });
  }

  return {
    text: `${isNegative && showSign ? '-' : ''}${formatValue}`,
    isNegative,
  };
}
