import { render, screen } from '@testing-library/react';
import App from '../../App';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

test('renders learn react link', () => {
  const history = createMemoryHistory();
  history.push('/');

  render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(screen.getByText(/the shaker/i)).toBeInTheDocument();
  expect(screen.getByText(/It´s time to have fun/i)).toBeInTheDocument();
  expect(screen.getByText(/Random Cocktail/i)).toBeInTheDocument();
});
