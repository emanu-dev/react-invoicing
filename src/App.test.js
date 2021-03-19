import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from './store';
import App from './App';

test('renders INVOICE', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const printModeButtonOn = screen.getByText(/Turn On Print Mode/i);
  expect(printModeButtonOn).toBeInTheDocument();
});