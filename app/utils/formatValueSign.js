// @flow

export type FormattedValueSign = {
  text: string,
  isNegative: boolean,
};

const PLUS_SIGN = '+';
const MINUS_SIGN = '-';

export default function formatValueSign(
  value: number,
  formattedValue: string,
  showSign: boolean = true,
  showPlusSign: boolean = true
): FormattedValueSign {
  const isNegative = value < 0;
  const plusSign = showPlusSign ? PLUS_SIGN : '';
  const minusSign = MINUS_SIGN;
  const sign = isNegative ? minusSign : plusSign;

  return {
    text: `${showSign ? sign : ''}${formattedValue}`,
    isNegative,
  };
}
