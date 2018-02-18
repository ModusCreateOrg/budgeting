import { formatPercent } from 'utils/formatAmount';

it('formats percent correctly', () => {
  expect(formatPercent(0.23)).toEqual('23.00%');
});
