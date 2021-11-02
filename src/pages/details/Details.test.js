import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import App from '../../App';
import { createMemoryHistory } from 'history';
import DataContextProvider from '../../context/DataContext';

test('renders Detail text', () => {
  const history = createMemoryHistory();
  history.push('details/11117');

  render(
    <DataContextProvider>
      <Router history={history}>
        <App />
      </Router>
    </DataContextProvider>
  );

  expect(screen.getByText(/Recipe/i)).toBeInTheDocument();
  expect(screen.getByText(/Ingredients/i)).toBeInTheDocument();
});
