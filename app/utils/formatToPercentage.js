// @flow

export type FormattedValue = {
  text: string,
};

//To display the value as a percentage
export default function formatToPercentage(amount: number): FormattedValue {
  return {
    text: `${amount}%`,
  };
}
