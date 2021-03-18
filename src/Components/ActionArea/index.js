import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';

import ActionArea from './actionArea';

const ActionAreaContainer = props => {
  return (
    <Provider store={store}>
      <ActionArea
      {...props}
      />
    </Provider>
  )
}

export default ActionAreaContainer;