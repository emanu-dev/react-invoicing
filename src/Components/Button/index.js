import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';

import Button from './button';

const ButtonContainer = props => {
  return (
    <Provider store={store}>
      <Button
      {...props}
      />
    </Provider>
  )
}

export default ButtonContainer;