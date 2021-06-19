import React, { Component } from 'react';
import ItemDetails from './ItemDetails';
import YouMayLike from './YouMayLike';

class ItemDetailsContainer extends Component {
    render() {
        return (
            <div className='container'>
                <ItemDetails/>
                <br/>
                <YouMayLike/>
            </div>
        );
    }
}

export default ItemDetailsContainer;