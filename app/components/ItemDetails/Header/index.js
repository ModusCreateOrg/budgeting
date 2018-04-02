import React from 'react';
import styles from './styles.scss';
import { ItemDetails } from 'modules/items';

const ItemDetailsHeader = ({ transaction: { description }, ratio, isInflow }: ItemDetails) => {
    const sign = isInflow ? "+" : "-";
    
    return (
        <div>
            <h1>Item details for {description}</h1>
            <h3><span className={isInflow ? styles.inflow : styles.outflow}>{sign}</span>{ratio}%</h3>
        </div>
    );
}

export default ItemDetailsHeader;