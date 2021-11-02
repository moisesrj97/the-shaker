import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../../App';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { useAuth0 } from '@auth0/auth0-react';
import DataContextProvider from '../../context/DataContext';

const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
};

jest.mock('@auth0/auth0-react');

test('renders navbar when your logged in', async () => {
  useAuth0.mockReturnValue({
    isAuthenticated: true,
    user,
    logout: jest.fn(),
    loginWithRedirect: jest.fn(),
  });

  const history = createMemoryHistory();
  history.push('/search');

  render(
    <DataContextProvider>
      <Router history={history}>
        <App />
      </Router>
    </DataContextProvider>
  );

  expect(await screen.findByText(/by name/i)).toBeInTheDocument();
  expect(await screen.findByText(/by letter/i)).toBeInTheDocument();
  expect(await screen.findByText(/by alcoholic/i)).toBeInTheDocument();
  expect(await screen.findByText(/by type/i)).toBeInTheDocument();
  expect(await screen.findByText(/by glass/i)).toBeInTheDocument();
  expect(await screen.findByText(/by ingredient/i)).toBeInTheDocument();
  expect(await screen.findByText(/shake it!/i)).toBeInTheDocument();

  fireEvent.change(
    screen.getByLabelText('By name:', { target: { value: 'Margarita' } })
  );

  expect(1 + 1).toBe(2);
});
