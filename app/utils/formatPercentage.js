// @flow
type OptionsTypes = {
  decimals: number,
};

const formatPercentage = (value: number, { decimals = 2 }: OptionsTypes = {}): string =>
  `${String(value.toFixed(decimals))}%`;

export default formatPercentage;
