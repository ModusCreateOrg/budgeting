export default function formatPercentage(fraction) {
  const formatted = fraction.toLocaleString('en-us', {
    style: 'percent',
    minimumFractionDigits: 2,
  });

  return fraction > 0 ? `+${formatted}` : formatted;
}
