import * as React from 'react';

import LegendItem from './LegendItem';
import styles from './styles.scss';

const Legend = ({ data, color, dataValue, dataLabel, dataKey, reverse }) =>
  <ul className={`${styles.legend} ${reverse && styles.reverse}`}>
    {data.map((item, idx) =>
      <LegendItem color={color(idx)} key={item[dataKey]} label={item[dataLabel]} value={item[dataValue]} />
    )}
  </ul>;

Legend.propTypes = {
  data: React.PropTypes.array.isRequired,
  dataValue: React.PropTypes.string.isRequired,
  dataLabel: React.PropTypes.string.isRequired,
  dataKey: React.PropTypes.string.isRequired,
  color: React.PropTypes.func.isRequired,
  reverse: React.PropTypes.bool,
};

Legend.defaultProps = {
  reverse: false,
};

export default Legend;
