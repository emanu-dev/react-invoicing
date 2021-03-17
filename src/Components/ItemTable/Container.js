import React from 'react';
import {Provider} from 'react-redux';
import ItemTable from './itemTable';
import store from '../../store';

const ItemContainer = props => (
  <Provider store={store}>
    <ItemTable 
    {...props} 
    />
  </Provider>
)

export default ItemContainer;
