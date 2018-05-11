// @flow
import type { Transaction } from 'modules/transactions';

export type PercentageDataObject = {
  item: string,
  itemId: number,
  value: number,
};
export type PercentageData = {
  relativePercentage: string,
  isNegative: boolean,
  [chartData: PercentageDataObject]: mixed,
};

export default function getRelativePercentage(total: number, item: Transaction, showSign: boolean = true): PercentageData {
  const isNegative = item.value < 0;
  const relativePercentage = Number((item.value / total) * 100);
  return {
    relativePercentage: `${isNegative && showSign ? '-' : ''}${relativePercentage.toFixed(2)}%`,
    chartData: [
      {
        item: `Other ${isNegative ? 'outflow' : 'inflow'}`,
        itemId: '0',
        value: Math.abs(total - item.value),
      },
      {
        item: item.description,
        itemId: item.id.toString(),
        value: Math.abs(item.value),
      },
    ],
    isNegative,
  };

}