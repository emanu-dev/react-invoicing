import { combineReducers } from 'redux';

import infoReducer from './info';
import itemReducer from './item';

const Reducers = combineReducers({
    info: infoReducer,
    item: itemReducer,
})

export default Reducers;