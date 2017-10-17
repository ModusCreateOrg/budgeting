export default function formatPercent(fraction) {
  const formatted = fraction.toLocaleString('en-us', {
    style: 'percent',
    minimumFractionDigits: 2,
  });

  return fraction > 0 ? `+${formatted}` : formatted;
}
