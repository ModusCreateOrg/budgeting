export default function formatAmount(amount) {
  const isNegative = amount < 0;
  const formatValue = Math.abs(amount).toLocaleString('en-us', { style: 'currency', currency: 'USD' });

  return {
    text: `${isNegative ? '-' : ''}${formatValue}`,
    isNegative
  };
}
