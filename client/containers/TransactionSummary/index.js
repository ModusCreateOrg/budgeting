import React, { Component, PropTypes } from 'react';
import Grid from 'components/Grid';

const { string, shape, arrayOf, object } = PropTypes;

export default class TransactionSummary extends Component {
  static propTypes = {
    fields: arrayOf(shape({
      mapping: string,
      className: string
    })).isRequired,
    data: object
  };

  render() {
    const { fields, data } = this.props;
    return (
      <Grid.Footer>
        <Grid.Row>
          {
            fields.map((field, index) => {
              return (
                <Grid.Cell
                  text={data[field.mapping]}
                  className={field.className}
                  key={`tf${index}`}
                />
              );
            })
          }
        </Grid.Row>
      </Grid.Footer>
    );
  }
}
