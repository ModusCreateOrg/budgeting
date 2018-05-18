import React from 'react';
import ItemDetailsComponent from 'components/ItemDetails';
import ItemDetails from 'modules/items';
import {connect} from 'react-redux';
import {getItemDetails} from 'selectors/items';
import transactionReducer from 'modules/transactions';
import { injectAsyncReducers } from 'store';

injectAsyncReducers({
  transactions : transactionReducer
});

type ItemDetailsContainerProps = {
    ...ItemDetails
}

class ItemDetailsContainer extends React.Component<ItemDetailsContainerProps>{
    static defaultProps = {
        transaction : {},
        ratio : 0,
        isInflow : false,
        totalFlowValue : 0
    }

    render (){
        return (
            <ItemDetailsComponent {...this.props}/>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const itemId = ownProps.match.params.id;

    return {
        ...getItemDetails(state, itemId)
    };
}

export default connect(mapStateToProps)(ItemDetailsContainer);
