// @flow
import * as React from 'react';
import { withRouter, type RouterHistory } from 'react-router';
import { connect } from 'react-redux';
import { getTransactionContributionById, type TransactionContribution } from 'selectors/transactions';
import injectAsyncReducersWithDefaults from 'utils/injectAsyncReducersWithDefaults';
import ContributionCard from 'components/ContributionCard';
import GoBackButton from 'components/GoBackButton';

injectAsyncReducersWithDefaults();

type TransactionContributionProps = {
  contribution: ?TransactionContribution,
  history: RouterHistory,
};

export class ItemContribution extends React.Component<TransactionContributionProps> {
  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const { contribution } = this.props;

    if (!contribution) {
      return <h1>Not found!</h1>;
    }

    return (
      <div>
        <GoBackButton onClick={this.goBack} />
        <ContributionCard contribution={contribution} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps): TransactionContributionProps => ({
  contribution: getTransactionContributionById(state, +ownProps.match.params.itemId),
  history: ownProps.history,
});

export default withRouter(connect(mapStateToProps)(ItemContribution));
