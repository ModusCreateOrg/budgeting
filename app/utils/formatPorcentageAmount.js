// @flow

export type FormattedPorcentageAmount = {
  text: string,
  isNegative: boolean,
};

export default function formatPorcentageAmount(amount: number, showSign: boolean = true): FormattedPorcentageAmount {
  const isNegative = amount < 0;
  const formatValue = Math.abs(amount).toFixed(2);

  return {
    text: `${showSign && isNegative ? '-' : showSign ? '+' : ''}${formatValue}%`,
    isNegative,
  };
}
