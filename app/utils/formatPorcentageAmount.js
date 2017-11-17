// @flow

export type FormattedPorcentageAmount = {
  text: string,
  isNegative: boolean,
};

export default function formatPorcentageAmount(amount: number, showSign: boolean = true): FormattedPorcentageAmount {
  const isNegative = amount < 0;
  const formatValue = Math.abs(amount).toFixed(2);
  let sign = '+';
  if (showSign && isNegative) {
    sign = '-';
  } else if (!showSign) {
    sign = '';
  }
  return {
    text: `${sign}${formatValue}%`,
    isNegative,
  };
}
