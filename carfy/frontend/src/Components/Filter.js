import React from 'react';
import styles from "./Filter.module.scss"

const Filter = (props)=> {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });
    return (
        <div className={`${styles.filter}`}>
            <div className="filter-result"></div>
            <div className="filter-sort">
                Order
                <select  value={props.sort} onChange={props.sortServices}>
                    <option value="">Latest</option>
                    <option value="lowest">Lowest</option>
                    <option value="highest">Highest</option>
                </select>
            </div>
            <div className="filter-price">
                Price
                <select value={props.price} onChange={props.filterServices}>
                    <option value="">ALL</option>
                    <option value="15-">{formatter.format(15)+'<'}</option>
                    <option value="15-40">{formatter.format(30)+'-'+formatter.format(40)}</option>
                    <option value="40+">{formatter.format(40)+'>'}</option>
                </select>
            </div>
        </div>
    )
}

export default Filter
            