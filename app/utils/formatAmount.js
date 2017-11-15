// @flow

export type FormattedAmount = {
  text: string,
  isNegative: boolean,
  isPercent: boolean,
};

export default function formatAmount(amount: number, showSign: boolean = true, showPercent: boolean): FormattedAmount {
  const isNegative = amount < 0;
  let formatValue = Math.abs(amount);

  if(!showPercent) {
    formatValue = formatValue.toLocaleString('en-us', {
      style: 'currency',
      currency: 'USD',
    });
  }

  return {
    text: `${isNegative && showSign ? '-' : ''}${formatValue}${showPercent ? '%' : ''}`,
    isNegative,
  };
}
