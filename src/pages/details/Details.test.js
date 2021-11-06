import { fireEvent, render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import DataContextProvider, { DataContext } from '../../context/DataContext';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import App from '../../App';
import React from 'react';

jest.mock('@auth0/auth0-react');
jest.mock('axios');

const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
};

const history = createMemoryHistory();

describe('Given the component Details nad user is auth...', () => {
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
                  id: 'mock1',
                  name: 'mock1',
                  thumb: 'mock1',
                  apiId: 'mock1',
                },
                {
                  id: 'mock',
                  name: 'mock',
                  thumb: 'mock',
                  apiId: 'mock',
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
        case `https://www.thecocktaildb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/lookup.php?i=17826`:
          return Promise.resolve({
            data: {
              drinks: [
                {
                  idDrink: '17826',
                  strDrink: '1-900-FUK-MEUP',
                  strDrinkAlternate: null,
                  strTags: null,
                  strVideo: null,
                  strCategory: 'Shot',
                  strIBA: null,
                  strAlcoholic: 'Alcoholic',
                  strGlass: 'Old-fashioned glass',
                  strInstructions:
                    'Shake ingredients in a mixing tin filled with ice cubes. Strain into a rocks glass.',
                  strInstructionsES: null,
                  strInstructionsDE:
                    'Die Zutaten in einem mit Eiswürfeln gefüllten Mischgefäß schütteln. In ein Rocks Glas abseihen.',
                  strInstructionsFR: null,
                  strInstructionsIT:
                    'Shakerare gli ingredienti in una teglia piena di cubetti di ghiaccio.\r\nFiltrare in un bicchiere alto.',
                  'strInstructionsZH-HANS': null,
                  'strInstructionsZH-HANT': null,
                  strDrinkThumb:
                    'https://www.thecocktaildb.com/images/media/drink/uxywyw1468877224.jpg',
                  strIngredient1: 'Absolut Kurant',
                  strIngredient2: 'Grand Marnier',
                  strIngredient3: 'Chambord raspberry liqueur',
                  strIngredient4: 'Midori melon liqueur',
                  strIngredient5: 'Malibu rum',
                  strIngredient6: 'Amaretto',
                  strIngredient7: 'Cranberry juice',
                  strIngredient8: 'Pineapple juice',
                  strIngredient9: null,
                  strIngredient10: null,
                  strIngredient11: null,
                  strIngredient12: null,
                  strIngredient13: null,
                  strIngredient14: null,
                  strIngredient15: null,
                  strMeasure1: '1/2 oz ',
                  strMeasure2: '1/4 oz ',
                  strMeasure3: '1/4 oz ',
                  strMeasure4: '1/4 oz ',
                  strMeasure5: '1/4 oz ',
                  strMeasure6: '1/4 oz ',
                  strMeasure7: '1/2 oz ',
                  strMeasure8: '1/4 oz ',
                  strMeasure9: null,
                  strMeasure10: null,
                  strMeasure11: null,
                  strMeasure12: null,
                  strMeasure13: null,
                  strMeasure14: null,
                  strMeasure15: null,
                  strImageSource: null,
                  strImageAttribution: null,
                  strCreativeCommonsConfirmed: 'No',
                  dateModified: '2016-07-18 22:27:04',
                },
              ],
            },
          });
        case `https://www.thecocktaildb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/lookup.php?i=666666666`:
          return Promise.reject();
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
  });

  describe('When component is instantiated...', () => {
    test('renders Detail text', async () => {
      history.push('/details/17826');
      render(
        <DataContext.Provider
          value={{
            store: { user: { id: 'johndoe@me.com', fav: [{ apiId: '' }] } },
          }}
        >
          <Router history={history}>
            <App />
          </Router>
        </DataContext.Provider>
      );
      expect(await screen.findByText(/#Shot/i)).toBeInTheDocument();
      expect(
        await screen.findByText(/#Old-fashioned glass/i)
      ).toBeInTheDocument();
      expect(await screen.findByText(/#Alcoholic/i)).toBeInTheDocument();
      expect(await screen.findByText(/Recipe/i)).toBeInTheDocument();
      expect(await screen.findAllByText(/Ingredients/i)).toBeTruthy();
      expect(await screen.findByText(/1-900-FUK-MEUP/i)).toBeInTheDocument();
      expect(
        await screen.findByText(
          /Shake ingredients in a mixing tin filled with ice cubes. Strain into a rocks glass./i
        )
      ).toBeInTheDocument();
      expect(await screen.findByText(/Absolut Kurant/i)).toBeInTheDocument();
      expect(await screen.findAllByText(/1\/2 oz/i)).toBeTruthy();
      expect(await screen.findByText(/Grand Marnier/i)).toBeInTheDocument();
      expect(await screen.findAllByText(/1\/4 oz/i)).toBeTruthy();
    });
  });
  describe('When component is instantiated and throw an error...', () => {
    test('renders Detail text with error', async () => {
      history.push('/details/666666666');
      render(
        <DataContext.Provider
          value={{
            store: { user: { id: 'johndoe@me.com', fav: [{ apiId: '' }] } },
          }}
        >
          <Router history={history}>
            <App />
          </Router>
        </DataContext.Provider>
      );

      expect(
        await screen.findByText(
          "Sorry, we couldn't find your drink! Ask to Gerard (Maybe he stole it)!"
        )
      ).toBeInTheDocument();
    });
  });
  describe('When component is instantiated and added to favorites...', () => {
    test('user clicks on fav', async () => {
      history.push('/details/17826');
      render(
        <DataContextProvider>
          <Router history={history}>
            <App />
          </Router>
        </DataContextProvider>
      );

      expect(await screen.findByTestId('star-empty')).toBeInTheDocument();

      axios.patch.mockResolvedValue({
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
              name: 'Thai Iced Coffee',
              thumb:
                'https://www.thecocktaildb.com/images/media/drink/rqpypv1441245650.jpg',
              apiId: '17826',
              id: 'f1ffce43-78e1-41ab-8aa7-82b7f93d26c5',
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

      fireEvent.click(await screen.findByTestId('star-empty'));

      expect(await screen.findByTestId('star-full')).toBeInTheDocument();

      axios.patch.mockResolvedValue({
        data: {
          id: 'johndoe@me.com',
          fav: [
            {
              id: '',
              name: '',
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

      fireEvent.click(await screen.findByTestId('star-full'));
      expect(await screen.findByTestId('star-empty')).toBeInTheDocument();
    });
  });
});
