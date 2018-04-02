import React from 'react';
import { ItemDetails } from 'modules/items';
import ValueRatioChart from './ValueRatioChart';
import ItemDetailsHeader from './Header';
import BackButton from './BackButton';

const ItemDetailsComponent = (props: ItemDetails) => {
    const { transaction, history} = props;

    return (
        <section>
            <BackButton history={history}/>
            <ItemDetailsHeader {...props} />
            <ValueRatioChart {...props} />
        </section>
    );
}

export default ItemDetailsComponent;