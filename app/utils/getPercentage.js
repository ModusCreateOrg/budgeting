export default function getPercentage(value, total) {
  return Number((value * 100 / total).toFixed(2));
}
