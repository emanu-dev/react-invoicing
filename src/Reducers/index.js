import { combineReducers } from 'redux';

import infoReducer from './info';
import itemReducer from './item';
import currencyReducer from './currency';

const Reducers = combineReducers({
    info: infoReducer,
    item: itemReducer,
    currency: currencyReducer
})

export default Reducers;
