import React from 'react';
import {Provider} from 'react-redux';
import InfoInput from './infoInput';
import store from '../../store';

const InfoInputContainer = props => (
  <Provider store={store}>
    <InfoInput
        {...props} 
    />
  </Provider>
)

export default InfoInputContainer;
