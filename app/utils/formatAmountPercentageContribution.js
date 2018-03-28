// @flow
import formatValueSign from 'utils/formatValueSign';
import type { FormattedValueSign } from 'utils/formatValueSign';

export default function formatAmountPercentageContribution(
  amount: number = 0,
  total: number = 1,
  precision: number = 2,
  showSign: boolean = true,
  showPlusSign: boolean = true
): FormattedValueSign {
  total = total || amount || 1;
  const contributionPercentage = Math.abs(amount / total) * 100;
  const precisionMagnitude = 10 ** precision;
  const formattedValue = `${parseFloat(
    Math.round(contributionPercentage * precisionMagnitude) / precisionMagnitude
  ).toFixed(precision)}%`;
  return formatValueSign(amount, formattedValue, showSign, showPlusSign);
}
