import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../../App';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import DataContextProvider from '../../context/DataContext';
import { useAuth0 } from '@auth0/auth0-react';

const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
};
jest.mock('@auth0/auth0-react');

describe('Given the component CustomPage...', () => {
  describe('When component is instantiated...', () => {
    test('renders learn react link', () => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });

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
  });
});
