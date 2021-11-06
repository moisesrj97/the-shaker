import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Router } from 'react-router';
import App from '../../App';
import { createMemoryHistory } from 'history';
import DataContextProvider, { DataContext } from '../../context/DataContext';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

jest.mock('@auth0/auth0-react');
jest.mock('axios');

const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
};

const history = createMemoryHistory();

describe('Given the component DetailsCustom...', () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    });

    axios.get = jest.fn((url) => {
      switch (url) {
        case 'http://localhost:3000/users/johndoe@me.com':
          return Promise.resolve({
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
                {
                  name: 'el mio custom',
                  thumb: 'mock.jpg',
                  recipe: 'mock',
                  type: 'mock',
                  glass: 'mock',
                  alcoholic: 'mock',
                  ingredientes: ['mock'],
                  ingredientesAmount: ['mock'],
                  id: 'mock-mock-mock-mock',
                },
              ],
            },
          });
        case `https://www.thecocktaildb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/list.php?i=list`:
          return Promise.resolve({
            data: { drinks: [{ strIngredient1: 'Vodka' }] },
          });
        case `https://www.thecocktaildb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/list.php?g=list`:
          return Promise.resolve({
            data: { drinks: [{ strGlass: 'Highball glass' }] },
          });
        case `https://www.thecocktaildb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/list.php?a=list`:
          return Promise.resolve({
            data: { drinks: [{ strAlcoholic: 'Alcoholic' }] },
          });
        case `https://www.thecocktaildb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/list.php?c=list`:
          return Promise.resolve({
            data: { drinks: [{ strCategory: 'Cocktail' }] },
          });
        default:
          return {};
      }
    });

    axios.patch = jest.fn().mockResolvedValue({
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
  });

  describe('When component is instantiated...', () => {
    test('renders DetailCustom text', async () => {
      history.push('/details-custom/mock-mock-mock-mock');

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
                  {
                    name: 'el mio custom',
                    thumb: 'mock.jpg',
                    recipe: 'mock',
                    type: 'mock',
                    glass: 'mock',
                    alcoholic: 'mock',
                    ingredientes: ['mock'],
                    ingredientesAmount: ['mock'],
                    id: 'mock-mock-mock-mock',
                  },
                ],
              },
            },
          }}
        >
          <Router history={history}>
            <App />
          </Router>
        </DataContext.Provider>
      );

      expect(screen.getByText(/el mio custom/i)).toBeInTheDocument();
    });
  });
  describe('When component is instantiated and throw an error...', () => {
    test('renders DetailCustom text with error', async () => {
      history.push('/details-custom/6666666666');

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
                  {
                    name: 'el mio custom',
                    thumb: 'mock.jpg',
                    recipe: 'mock',
                    type: 'mock',
                    glass: 'mock',
                    alcoholic: 'mock',
                    ingredientes: ['mock'],
                    ingredientesAmount: ['mock'],
                    id: 'mock-mock-mock-mock',
                  },
                ],
              },
            },
          }}
        >
          <Router history={history}>
            <App />
          </Router>
        </DataContext.Provider>
      );

      expect(
        await screen.findByText(/Sorry, we couldn't find your drink!/i)
      ).toBeInTheDocument();
    });
  });
  describe('When component is instantiated and delete button is clicked', () => {
    test('renders DetailCustom text', async () => {
      history.push('/custom/');

      render(
        <DataContextProvider>
          <Router history={history}>
            <App />
          </Router>
        </DataContextProvider>
      );

      expect(await screen.findByText(/el mio custom/i)).toBeInTheDocument();

      fireEvent.click(await screen.findByText(/el mio custom/i));

      expect(await screen.findByTestId('delete-button')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('delete-button'));

      await waitFor(
        async () => {
          expect(history.location.pathname).toBe('/custom');
        },
        { timeout: 5000 }
      );

      const title = screen.queryByText('el mio custom');

      expect(title).not.toBeInTheDocument();
    });
  });
});
