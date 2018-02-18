// @flow
import * as React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import BudgetOverview from 'containers/BudgetOverview';
import { injectAsyncReducers } from 'store';
import transactionReducer from 'modules/transactions';
import BudgetItemDetails from 'components/BudgetItemDetails';


// inject reducers that might not have been originally there
injectAsyncReducers({
    transactions: transactionReducer,
});


const BudgetContainer = ({ match }) => {
    return (
        <Switch>
            <Route path={`${match.url}/item-details/:id`} component={BudgetItemDetails} />
            <Route exact path={`${match.url}/`} component={BudgetOverview} />
            <Redirect to={`${match.url}/`} />
        </Switch>
    )
};

export default withRouter(BudgetContainer);
