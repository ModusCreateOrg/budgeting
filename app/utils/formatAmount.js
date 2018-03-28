// @flow
import formatValueSign from 'utils/formatValueSign';
import type { FormattedValueSign } from 'utils/formatValueSign';

export default function formatAmount(
  amount: number,
  showSign: boolean = true,
  showPlusSign: boolean = false
): FormattedValueSign {
  const formattedValue = Math.abs(amount).toLocaleString('en-us', {
    style: 'currency',
    currency: 'USD',
  });
  return formatValueSign(amount, formattedValue, showSign, showPlusSign);
}
