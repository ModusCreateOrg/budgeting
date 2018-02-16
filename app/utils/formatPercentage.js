// @flow
type OptionsTypes = {
  decimals: number,
};

// converts a number value such as (3145.2356345) to a percentage string with fixed decimals (e.g. 3145.24%)
const formatPercentage = (value: number, { decimals = 2 }: OptionsTypes = {}): string =>
  `${String(value.toFixed(decimals))}%`;

export default formatPercentage;
