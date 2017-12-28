// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { getTransactionContributionData } from 'selectors/transactions';
import PercentPieChart, { PercentPieSlice } from 'components/PercentPieChart';
import styles from './style.scss';

type ItemContributionProps = {
  data: PercentPieSlice[],
};

export class ItemDescription extends React.Component<ItemContributionProps> {
  static defaultProps = {
    data: [],
  };

  render() {
    const { data } = this.props;
    return (
      <div className={styles.itemContribution}>
        <PercentPieChart slices={data} />
      </div>
    );
  }
}

const mapStateToProps = (state, { itemId }) => ({
  data: getTransactionContributionData(state, itemId),
});

export default connect(mapStateToProps)(ItemDescription);
