import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import NavBar from './NavBar';
import axios from 'axios';

const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
};

jest.mock('@auth0/auth0-react');
jest.mock('axios');

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
  describe('When the user clicks login button...', () => {
    test('it should call the loginWithRedirect function', () => {
      const loginWithRedirect = useAuth0().loginWithRedirect;

      axios.get = jest.fn().mockResolvedValue({
        data: {
          id: 'johndoe@me.com',
          fav: [
            {
              id: '',
              name: '',
              thumb: '',
              apiId: '',
            },
            {
              id: '12345',
              name: 'mock cocktail',
              thumb: '',
              apiId: '',
            },
          ],
          custom: [
            {
              name: '',
              thumb: '',
              recipe: '',
              type: '',
              glass: '',
              alcoholic: '',
              ingredientes: [''],
              ingredientesAmount: [''],
              id: '',
            },
          ],
        },
      });

      fireEvent.click(screen.getByText(/Login/i));

      expect(loginWithRedirect).toHaveBeenCalled();
    });
  });
  describe('When the user clicks login button for the first time...', () => {
    test('It gets logged in after the api threw an error', () => {
      const loginWithRedirect = useAuth0().loginWithRedirect;

      axios.get = jest.fn().mockRejectedValue();
      axios.post = jest.fn().mockResolvedValue({
        data: {
          id: 'johndoe@me.com',
          fav: [
            {
              id: '',
              name: '',
              thumb: '',
              apiId: '',
            },
            {
              id: '12345',
              name: 'mock cocktail',
              thumb: '',
              apiId: '',
            },
          ],
          custom: [
            {
              name: '',
              thumb: '',
              recipe: '',
              type: '',
              glass: '',
              alcoholic: '',
              ingredientes: [''],
              ingredientesAmount: [''],
              id: '',
            },
          ],
        },
      });

      fireEvent.click(screen.getByText(/login/i));
      expect(loginWithRedirect).toHaveBeenCalled();
    });
  });
});
