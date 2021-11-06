import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../../App';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { useAuth0 } from '@auth0/auth0-react';
import DataContextProvider from '../../context/DataContext';
import userEvent from '@testing-library/user-event';
import React from 'react';
import FormCustom from './formCustom';
import axios from 'axios';

const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
};

const history = createMemoryHistory();

jest.mock('@auth0/auth0-react');
jest.mock('axios');

describe('Given the component FormCustom...', () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user: user,
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
            data: {
              drinks: [{ strIngredient1: 'Vodka' }, { strIngredient1: 'Gin' }],
            },
          });
        case `https://www.thecocktaildb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/list.php?g=list`:
          return Promise.resolve({
            data: { drinks: [{ strGlass: 'Cocktail glass' }] },
          });
        case `https://www.thecocktaildb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/list.php?a=list`:
          return Promise.resolve({
            data: { drinks: [{ strAlcoholic: 'Alcoholic' }] },
          });
        case `https://www.thecocktaildb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/list.php?c=list`:
          return Promise.resolve({
            data: { drinks: [{ strCategory: 'Ordinary Drink' }] },
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
            name: 'My custom',
            thumb: 'Mycustom.jpg',
            recipe: 'My custom',
            type: 'My custom',
            glass: 'My custom',
            alcoholic: 'My custom',
            ingredientes: ['My custom'],
            ingredientesAmount: ['My custom'],
            id: 'My-custom',
          },
        ],
      },
    });

    history.push('/create-custom');
  });

  describe('When component is instantiated...', () => {
    test('custom form show labels', async () => {
      render(
        <DataContextProvider>
          <Router history={history}>
            <FormCustom />
          </Router>
        </DataContextProvider>
      );

      expect(await screen.findByText(/create cocktail/i)).toBeInTheDocument();
      expect(await screen.findByText(/name/i)).toBeInTheDocument();
      expect(await screen.findByText(/image url/i)).toBeInTheDocument();
      expect(await screen.findByText(/recipe/i)).toBeInTheDocument();
      expect(await screen.findByText(/type/i)).toBeInTheDocument();
      expect(await screen.findAllByText(/alcoholic/i)).toBeTruthy();
      expect(await screen.findAllByText(/glass/i)).toBeTruthy();
      expect(await screen.findByText(/ingredients/i)).toBeInTheDocument();
    });
  });
  describe('When component is instantiated create a cocktail...', () => {
    test('create cocktail', async () => {
      render(
        <DataContextProvider>
          <Router history={history}>
            <FormCustom />
          </Router>
        </DataContextProvider>
      );

      fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: 'My custom' },
      });
      fireEvent.change(screen.getByLabelText(/image url/i), {
        target: {
          value:
            'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg',
        },
      });
      fireEvent.change(screen.getByLabelText(/recipe/i), {
        target: { value: 'Custom recipe' },
      });
      userEvent.selectOptions(
        await screen.findByLabelText(/type/i),
        'Ordinary Drink'
      );
      userEvent.selectOptions(
        await screen.findByLabelText(/alcoholic/i),
        'Alcoholic'
      );
      userEvent.selectOptions(
        await screen.findByLabelText(/glass/i),
        'Cocktail glass'
      );
      userEvent.selectOptions(
        await screen.findByLabelText(/ingredients/i),
        'Vodka'
      );
      userEvent.selectOptions(
        await screen.findByLabelText(/ingredients/i),
        'Gin'
      );

      fireEvent.change(await screen.findByLabelText(/Gin/i), {
        target: { value: '125ml' },
      });

      const deleteButton = await screen.findAllByTestId('delete-ingredient');

      fireEvent.click(deleteButton[0]);

      fireEvent.click(await screen.findByText(/add/i));

      await waitFor(
        async () => {
          expect(history.location.pathname).toBe('/custom');
        },
        { timeout: 5000 }
      );
    });
  });
  describe('When component is instantiated modify a cocktail...', () => {
    test('modify cocktail', async () => {
      history.push('/custom/');

      render(
        <DataContextProvider>
          <Router history={history}>
            <App />
          </Router>
        </DataContextProvider>
      );

      fireEvent.click(await screen.findByText(/el mio custom/i));

      fireEvent.click(await screen.findByTestId('edit-button'));

      fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: 'My custom' },
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
              name: 'My custom',
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

      fireEvent.click(screen.getByText(/add/i));

      await waitFor(
        async () => {
          expect(history.location.pathname).toBe('/custom');
        },
        { timeout: 5000 }
      );
    });
  });
});
