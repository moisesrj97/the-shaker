import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import DataContextProvider from '../../context/DataContext';
import App from '../../App';
import { useAuth0 } from '@auth0/auth0-react';

const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
};

jest.mock('@auth0/auth0-react');

test('renders favorites', async () => {
  useAuth0.mockReturnValue({
    isAuthenticated: true,
    user,
    logout: jest.fn(),
    loginWithRedirect: jest.fn(),
  });

  const history = createMemoryHistory();
  history.push('/favorites');

  render(
    <DataContextProvider>
      <Router history={history}>
        <App />
      </Router>
    </DataContextProvider>
  );

  expect(await screen.findByText(/Mock Cocktail/i)).toBeInTheDocument();
  expect(screen.getByRole('img')).toBeInTheDocument();
});

test('renders favorites', async () => {
  useAuth0.mockReturnValue({
    isAuthenticated: true,
    user: undefined,
    logout: jest.fn(),
    loginWithRedirect: jest.fn(),
  });

  const history = createMemoryHistory();
  history.push('/favorites');

  render(
    <DataContextProvider>
      <Router history={history}>
        <App />
      </Router>
    </DataContextProvider>
  );

  expect(await screen.findByText(/No cocktails to show/i)).toBeInTheDocument();
});
