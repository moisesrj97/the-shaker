import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from './NavBar';

const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
};

jest.mock('@auth0/auth0-react');

describe('Given the component NavBar being logged in...', () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });

    render(
      <Router>
        <NavBar />
      </Router>
    );
  });
  describe('When component is instantiated...', () => {
    test('renders navbar when your logged in', () => {
      expect(screen.getByText('Cocktails')).toBeInTheDocument();
      expect(screen.getByText('My Cocktails')).toBeInTheDocument();
      expect(screen.getByText('Favorites')).toBeInTheDocument();
      expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    });
  });
  describe('When component is instantiated and you are logged in with mobile...', () => {
    test('renders mobile navbar when you are logged in', () => {
      const hamburguer = document.querySelector('.hamburger-react');

      fireEvent.click(hamburguer);

      expect(screen.getAllByText('Cocktails')).toHaveLength(2);
      expect(screen.getAllByText('My Cocktails')).toHaveLength(2);
      expect(screen.getAllByText('Favorites')).toHaveLength(2);
      expect(screen.getAllByText(/Logout/i)).toHaveLength(2);
    });
  });
});

describe('Given the component NavBar being logged out...', () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: false,
      user: null,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });

    render(
      <Router>
        <NavBar />
      </Router>
    );
  });
  describe('When component is instantiated...', () => {
    test('renders navbar when your logged out', () => {
      expect(screen.getByText('Cocktails')).toBeInTheDocument();
      expect(screen.queryByText('My Cocktails')).toBeNull();
      expect(screen.queryByText('Favorites')).toBeNull();
      expect(screen.getByText(/Login/i)).toBeInTheDocument();
    });
  });
  describe('When component is instantiated and you are logged in with mobile...', () => {
    test('renders mobile navbar when you are logged out', () => {
      const hamburguer = document.querySelector('.hamburger-react');

      fireEvent.click(hamburguer);

      expect(screen.getAllByText('Cocktails')).toHaveLength(2);
      expect(screen.queryByText('My Cocktails')).toBeNull();
      expect(screen.queryByText('Favorites')).toBeNull();
      expect(screen.getAllByText(/Login/i)).toHaveLength(2);
    });
  });
});
