// @flow
import type { State } from 'modules/rootReducer';
import type { ItemDetails } from 'modules/items';
import {getTransactionById, getValueRatioToInflow, getValueRatioToOutflow, getInflowBalance, getOutflowBalance} from './transactions';

export const getItemDetails = (state: State, id : number): ItemDetails => {
    const transaction = getTransactionById(state,id);
    const isInflow = transaction.value > 0;
    const itemDetails =   {
        transaction : getTransactionById(state, id),
        ratio : (isInflow ? getValueRatioToInflow(state, transaction.value) : getValueRatioToOutflow(state, transaction.value)),
        isInflow,
        totalFlowValue : (isInflow ? getInflowBalance(state) : getOutflowBalance(state))
    }

    return itemDetails;
};
