import React from 'react';
import {Provider} from 'react-redux';
import InfoArea from './infoArea';
import store from '../../store';

const InfoInputContainer = props => (
  <Provider store={store}>
    <InfoArea
        {...props} 
    />
  </Provider>
)

export default InfoInputContainer;
