import { fireEvent, render, screen } from '@testing-library/react';
import App from '../../App';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { useAuth0 } from '@auth0/auth0-react';

const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
};

describe('Given the component NavBar...', () => {
  describe('When component is instantiated...', () => {
    jest.mock('@auth0/auth0-react');

    test('renders navbar when your logged in', () => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });

      const history = createMemoryHistory();
      history.push('/');

      render(
        <Router history={history}>
          <App />
        </Router>
      );

      expect(screen.getByText('Cocktails')).toBeInTheDocument();
      expect(screen.getByText('My Cocktails')).toBeInTheDocument();
      expect(screen.getByText('Favorites')).toBeInTheDocument();
      expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    });
  });
  describe('When component is instantiated and you are logged out...', () => {
    test('renders navbar when you are logged out', () => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user: undefined,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });

      const history = createMemoryHistory();
      history.push('/');

      render(
        <Router history={history}>
          <App />
        </Router>
      );

      expect(screen.getByText('Cocktails')).toBeInTheDocument();
      expect(screen.getByText(/Login/i)).toBeInTheDocument();
    });
  });
  describe('When component is instantiated and you are logged in with mobile...', () => {
    test('renders mobile navbar when you are logged in', () => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });

      const history = createMemoryHistory();
      history.push('/');

      render(
        <Router history={history}>
          <App />
        </Router>
      );

      const hamburguer = document.querySelector('.hamburger-react');

      fireEvent.click(hamburguer);

      expect(screen.getAllByText('Cocktails')).toHaveLength(2);
      expect(screen.getAllByText('My Cocktails')).toHaveLength(2);
      expect(screen.getAllByText('Favorites')).toHaveLength(2);
      expect(screen.getAllByText(/Logout/i)).toHaveLength(2);
    });
  });
  describe('When component is instantiated and you are logged out with mobile...', () => {
    test('renders mobile navbar when you are not logged in', () => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user: undefined,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });

      const history = createMemoryHistory();
      history.push('/');

      render(
        <Router history={history}>
          <App />
        </Router>
      );

      const hamburguer = document.querySelector('.hamburger-react');

      fireEvent.click(hamburguer);

      expect(screen.getAllByText('Cocktails')).toHaveLength(2);
      expect(screen.getAllByText(/Login/i)).toHaveLength(2);
    });
  });
});
