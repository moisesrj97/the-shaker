import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import axios from 'axios';
import DataContextProvider from '../../context/DataContext';
import HomePage from './HomePage';
import App from '../../App';

const history = createMemoryHistory();

jest.mock = 'axios';

describe('Given the component homePage...', () => {
  beforeEach(() => {
    history.push('/');

    axios.get = jest.fn().mockResolvedValue({
      data: {
        drinks: [
          {
            idDrink: '17183',
            strDrink: 'Bacardi Cocktail',
            strDrinkAlternate: null,
            strTags: 'IBA,Classic',
            strVideo: 'https://www.youtube.com/watch?v=MJR56P34fWc',
            strCategory: 'Ordinary Drink',
            strIBA: 'Unforgettables',
            strAlcoholic: 'Alcoholic',
            strGlass: 'Cocktail glass',
            strInstructions:
              'Shake together with ice. Strain into glass and serve.',
            strInstructionsES: null,
            strInstructionsDE:
              'Mit Eis zusammen schütteln. In ein Glas abseihen und servieren.',
            strInstructionsFR: null,
            strInstructionsIT:
              'Shakerare insieme al ghiaccio.\r\nFiltrare nel bicchiere e servire.',
            'strInstructionsZH-HANS': null,
            'strInstructionsZH-HANT': null,
            strDrinkThumb:
              'https://www.thecocktaildb.com/images/media/drink/n433t21504348259.jpg',
            strIngredient1: 'Light rum',
            strIngredient2: 'Lime juice',
            strIngredient3: 'Sugar syrup',
            strIngredient4: 'Grenadine',
            strIngredient5: null,
            strIngredient6: null,
            strIngredient7: null,
            strIngredient8: null,
            strIngredient9: null,
            strIngredient10: null,
            strIngredient11: null,
            strIngredient12: null,
            strIngredient13: null,
            strIngredient14: null,
            strIngredient15: null,
            strMeasure1: '1 3/4 oz Bacardi ',
            strMeasure2: '1 oz ',
            strMeasure3: '1/2 tsp ',
            strMeasure4: '1 dash ',
            strMeasure5: null,
            strMeasure6: null,
            strMeasure7: null,
            strMeasure8: null,
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
            dateModified: '2017-09-02 11:30:59',
          },
        ],
      },
    });
  });
  describe('When component is instanciated...', () => {
    test('renders homepage info', () => {
      render(
        <Router history={history}>
          <HomePage />
        </Router>
      );
      expect(screen.getByText(/the shaker/i)).toBeInTheDocument();
      expect(screen.getByText(/It´s time to have fun/i)).toBeInTheDocument();
      expect(screen.getByText(/Random Cocktail/i)).toBeInTheDocument();
    });
  });
  describe('When component is instanciated and random button clicked...', () => {
    test('it goes to a random cocktail page', async () => {
      const history = createMemoryHistory();
      history.push('/');
      render(
        <DataContextProvider>
          <Router history={history}>
            <App />
          </Router>
        </DataContextProvider>
      );

      fireEvent.click(screen.getByText(/Random/i));

      await waitFor(() => {
        expect(history.location.pathname).toBe('/details/17183');
      });
    });
  });
});
