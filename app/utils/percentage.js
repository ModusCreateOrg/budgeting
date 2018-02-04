// @flow

export type FormattedAmount = {
  text: string,
  isNegative: boolean,
};

export default function percentage(numerator: number, denom: number, showSign: boolean = true): FormattedAmount {
  const amount = numerator / denom * 100;
  const isNegative = amount < 0;
  const formatValue = Math.abs(amount).toLocaleString('en', {
    maximumSignificantDigits: 4,
  });

  return {
    text: `${isNegative && showSign ? '-' : ''}${formatValue}`,
    isNegative,
  };
}
