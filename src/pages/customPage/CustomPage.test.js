import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../../App';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import DataContextProvider from '../../context/DataContext';

test('renders learn react link', () => {
  const history = createMemoryHistory();
  history.push('/custom');

  render(
    <DataContextProvider>
      <Router history={history}>
        <App />
      </Router>
    </DataContextProvider>
  );
  expect(screen.getByText(/add/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText(/add/i));

  expect(history.location.pathname).toBe('/create-custom');
});
