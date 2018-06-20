// @flow
import { inflowCategories } from '../modules/defaults';

export type FormattedPercentage = {
  text: string,
  value: number,
  isNegative: boolean,
};

export default function formatPercentage(amount: number, total: number,categoryId: string,showSign: boolean = true): FormattedPercentage {
  total = total < 1 ? 1 : total;
  const percent = Math.abs(amount*100 /total);
  const formatValue = normalizePercentage(categoryId,percent);
  const isNegative = formatValue < 0 ? true : false;
  return {
    text: `${isNegative && showSign ? '-' : ''}${Math.trunc(percent)}%`,
    value: Math.trunc(percent),
    isNegative,
  };
}



function normalizePercentage(categoryId: string, value: number): number {
  const realValue = inflowCategories.includes(categoryId) ? Math.abs(value) : Math.abs(value) * -1;

  return  realValue;
}
