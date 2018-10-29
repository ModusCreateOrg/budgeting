// @flow
import { FormattedAmount } from 'modules/formattedAmount';

export default function formatAmount(amount: number, showSign: boolean = true): FormattedAmount {
  const isNegative = amount < 0;
  const formatValue = Math.abs(amount).toLocaleString('en-us', {
    style: 'currency',
    currency: 'USD',
  });

  return {
    text: `${isNegative && showSign ? '-' : ''}${formatValue}`,
    isNegative,
  };
}

type strNum = string | number;

export const absNumber = (str: strNum): number => {
  return typeof str === 'string' ? Number(str.replace(/[^0-9.-]+/g,"")) : str;
};

export const computePercent = (part: strNum, whole: strNum): number => {
  const getAbsPart = absNumber(part);
  const getAbsWhole = absNumber(whole);
  const result = (getAbsPart/getAbsWhole) * 100;
  // Percentages are usually rounded up to two decimal places
  const roundedUpResult = Number(parseFloat(result).toFixed(2));
  return roundedUpResult;
};