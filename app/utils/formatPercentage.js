// @flow

export type FormattedPercentage = {
  text: string,
  isNegative: boolean,
};

export default function formatPercentage(percent: number, showSign: boolean = true): FormattedPercentage {
  const isNegative = percent < 0;
  const formatPercent = Math.round(Math.abs(percent));

  return {
    text: `${isNegative && showSign ? '-' : ''}${formatPercent}%`,
    isNegative,
  };
}
