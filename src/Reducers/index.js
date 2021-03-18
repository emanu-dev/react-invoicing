import { combineReducers } from 'redux';

import infoReducer from './info';
import itemReducer from './item';
import currencyReducer from './currency';
import logoReducer from './logo';
import printModeReducer from './printMode';

const Reducers = combineReducers({
    info: infoReducer,
    item: itemReducer,
    currency: currencyReducer,
    logo: logoReducer,
    printMode: printModeReducer
})

export default Reducers;
