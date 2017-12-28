export default function calculatePercentage(amount: number, inflowBalance: number) {
  return (amount * 100 / inflowBalance).toFixed(2).concat('%');
}
