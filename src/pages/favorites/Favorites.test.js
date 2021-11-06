import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Favorites from './Favorites';

import { DataContext } from '../../context/DataContext';
import { useAuth0 } from '@auth0/auth0-react';

const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
};
jest.mock('@auth0/auth0-react');
jest.mock('axios');

describe('Given the component Favorites...', () => {
  describe('When component is instantiated...', () => {
    test('renders favorites', async () => {
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
                    thumb: 'asdad.jpg',
                    apiId: '12345',
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
            },
          }}
        >
          <BrowserRouter>
            <Favorites />
          </BrowserRouter>
        </DataContext.Provider>
      );

      expect(await screen.findByText(/Mock Cocktail/i)).toBeInTheDocument();
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });
});
