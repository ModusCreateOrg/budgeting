import * as React from 'react';

export default function DataSelector(props) {
  const { data } = props;

  return (
    <select name={props.name} value={props.value} onChange={props.onChange}>
      {Object.keys(data).map(id =>
        <option key={id} value={id}>
          {data[id]}
        </option>
      )}
    </select>
  );
}

DataSelector.propTypes = {
  name: React.PropTypes.string,
  value: React.PropTypes.string.isRequired,
  data: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

DataSelector.defaultProps = {
  name: '',
};
