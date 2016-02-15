import React, { Component, PropTypes } from 'react';
import Grid from 'components/Grid';

export default class TransactionForm extends Component {
  static propTypes = {
    action: PropTypes.func
  };

  onFieldKeyUp(e) {
    if (e.keyCode === 13) {
      this.submitForm();
    }
  }

  submitForm() {
    const { valueField, descField } = this.refs;
    const { action } = this.props;
    const value = parseFloat(valueField.value, 10);
    const description = descField.value;

    if (value === 0  || isNaN(value) || description.length === 0) {
      return;
    }

    action({ value, description });

    valueField.value = descField.value = '';
    descField.focus();
  }

  render() {
    const onFieldKeyUp = this.onFieldKeyUp.bind(this);

    return (
      <Grid.Footer>
        <Grid.Row>
          <Grid.Cell>
            <input
              name="description"
              placeholder="Description"
              ref="descField"
              onKeyUp={onFieldKeyUp}
            />
          </Grid.Cell>
          <Grid.Cell>
            <input
              name="value"
              placeholder="Value"
              ref="valueField"
              onKeyUp={onFieldKeyUp}
              type="number"
              step="any"
            />
          </Grid.Cell>
        </Grid.Row>
      </Grid.Footer>
    );
  }
}
