import React, { PropTypes } from 'react';

export default function DataSelector(props) {
  const { data } = props;

  return (
    <select name={props.name} value={props.value} onChange={props.onChange}>
      {Object.keys(data).map(id => (
        <option key={id} value={id}>
          {data[id]}
        </option>
      ))}
    </select>
  );
}

DataSelector.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

DataSelector.defaultProps = {
  name: '',
};
