import {
  fireEvent,
  prettyDOM,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { Router } from 'react-router';
import App from '../../App';
import { createMemoryHistory } from 'history';
import DataContextProvider from '../../context/DataContext';
import { useAuth0 } from '@auth0/auth0-react';
import UsersAPI from '../../services/UsersAPI';
import { removeFav } from '../../reducer/actionMaker';

jest.mock('@auth0/auth0-react');

const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
};

describe('Given the component DetailsCustom...', () => {
  describe('When component is instantiated...', () => {
    test('renders DetailCustom text', async () => {
      const history = createMemoryHistory();
      history.push('/custom');

      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });

      render(
        <DataContextProvider>
          <Router history={history}>
            <App />
          </Router>
        </DataContextProvider>
      );

      const inputs = await screen.findAllByText(/el mio custom/i);

      fireEvent.click(inputs[0]);

      expect(await screen.findByText(/el mio custom/i)).toBeInTheDocument();

      fireEvent.click(await screen.findByTestId('delete-button'));

      await waitFor(
        async () => {
          expect(history.location.pathname).toBe('/custom');
        },
        { timeout: 5000 }
      );
    });
  });
  describe('When component is instantiated and throw an error...', () => {
    test('renders DetailCustom text with error', async () => {
      const history = createMemoryHistory();
      history.push('/details-custom/6666666666');

      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });

      render(
        <DataContextProvider>
          <Router history={history}>
            <App />
          </Router>
        </DataContextProvider>
      );

      expect(
        await screen.findByText(/Sorry, we couldn't find your drink!/i)
      ).toBeInTheDocument();
    });
  });
});
