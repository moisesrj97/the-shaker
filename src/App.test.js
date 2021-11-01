import { render, screen } from '@testing-library/react';
import App from './App';
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
  const linkElement = screen.getByText(/the shaker/i);
  expect(linkElement).toBeInTheDocument();
});
