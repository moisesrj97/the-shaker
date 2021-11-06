import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../../App';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import DataContextProvider, { DataContext } from '../../context/DataContext';
import { useAuth0 } from '@auth0/auth0-react';
import CustomPage from './CustomPage';

const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
};
jest.mock('@auth0/auth0-react');

describe('Given the component CustomPage...', () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });

    render(
      <DataContext.Provider
        value={{
          store: {
            user: {
              custom: [{}],
            },
          },
        }}
      >
        <BrowserRouter>
          <CustomPage />
        </BrowserRouter>
      </DataContext.Provider>
    );
  });

  describe('When component is instantiated...', () => {
    test('renders add button', () => {
      expect(screen.getByText(/add/i)).toBeInTheDocument();
    });
  });
});
