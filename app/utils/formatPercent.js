// @flow

export type FormattedPercent = {
  text: string,
  isNegative: boolean,
};

export default function formatPercent(amount: number, showSign: boolean = true): FormattedPercent {
  const isNegative = amount < 0;
  const formatValue = Math.abs(amount).toLocaleString('en-us', {
    style: 'percent',
  });

  return {
    text: `${isNegative && showSign ? '-' : ''}${formatValue}`,
    isNegative,
  };
}
