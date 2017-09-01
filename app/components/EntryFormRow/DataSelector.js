// @flow
import * as React from 'react';
import type { Categories } from 'modules/categories';

type DataSelectorProps = {
  name: string,
  value: string,
  data: Categories,
  onChange: (e: SyntheticEvent<HTMLSelectElement>) => void,
};

export default function DataSelector(props: DataSelectorProps) {
  const { name, value, data, onChange } = props;

  return (
    <select name={name} value={value} onChange={onChange}>
      {Object.keys(data).map(id => (
        <option key={id} value={id}>
          {data[id]}
        </option>
      ))}
    </select>
  );
}

DataSelector.defaultProps = {
  name: '',
};
