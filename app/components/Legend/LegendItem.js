// @flow
import * as React from 'react';
import formatAmount from 'utils/formatAmount';
import styles from './styles.scss';

type LegendItemProps = {
  color: string,
  value: number,
  label: string,
  format: Function,
};

export default class LegendItem extends React.Component<LegendItemProps> {
  render() {
    const { color, label, value, format } = this.props;

    let formattedValue = formatAmount(value).text;
    if (format) {
      formattedValue = format(value);
    }

    return (
      <li style={{ color }}>
        <span>{label}</span>
        <span className={styles.value}> {formattedValue} </span>
      </li>
    );
  }
}
