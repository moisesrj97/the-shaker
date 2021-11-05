import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { DataContext } from '../../context/DataContext';
import userEvent from '@testing-library/user-event';
import React from 'react';
import axios from 'axios';
import SearchPage from '../../pages/search/SearchPage';

jest.mock('@auth0/auth0-react');
jest.mock('axios');

const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
};

describe('Given the component SearchForm...', () => {
  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
    });

    render(
      <DataContext.Provider
        value={{
          store: {
            user: {
              id: '',
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
            lists: {
              ingredients: ['Vodka', 'Gin'],
              types: ['Ordinary Drink'],
              glasses: ['Cocktail glass'],
              alcoholic: ['Alcoholic'],
            },
          },
        }}
      >
        <BrowserRouter>
          <SearchPage />
        </BrowserRouter>
      </DataContext.Provider>
    );
  });

  describe('When component is instantiated...', () => {
    test('search form show labels and toggles inputs', async () => {
      expect(await screen.findByText(/by name/i)).toBeInTheDocument();
      expect(await screen.findByText(/by letter/i)).toBeInTheDocument();
      expect(await screen.findByText(/by alcoholic/i)).toBeInTheDocument();
      expect(await screen.findByText(/by type/i)).toBeInTheDocument();
      expect(await screen.findByText(/by glass/i)).toBeInTheDocument();
      expect(await screen.findByText(/by ingredient/i)).toBeInTheDocument();
      expect(await screen.findByText(/shake it!/i)).toBeInTheDocument();

      fireEvent.click(await screen.findByText(/by name/i));
      expect(await screen.findByRole('textbox')).toBeInTheDocument();
    });
  });
  describe('When component is instantiated and write an cocktail name...', () => {
    test('search by name', async () => {
      axios.get = jest.fn(() => {
        return Promise.resolve({
          data: {
            drinks: [
              {
                idDrink: '1234',
                strDrink: 'Blue Margarita',
                strDrinkThumb:
                  'https://www.thecocktaildb.com/images/media/drink/vqwvtp1472668462.jpg',
                strInstructions: '',
                strIngredient1: 'Vodka',
                strIngredient2: '',
                strIngredient3: '',
                strIngredient4: '',
                strIngredient5: '',
                strIngredient6: '',
                strIngredient7: '',
                strIngredient8: '',
                strIngredient9: '',
                strIngredient10: '',
                strIngredient11: '',
                strIngredient12: '',
                strIngredient13: '',
                strIngredient14: '',
                strIngredient15: '',
                strMeasure1: '1 shot',
                strMeasure2: '',
                strMeasure3: '',
                strMeasure4: '',
                strMeasure5: '',
                strMeasure6: '',
                strMeasure7: '',
                strMeasure8: '',
                strMeasure9: '',
                strMeasure10: '',
                strMeasure11: '',
                strMeasure12: '',
                strMeasure13: '',
                strMeasure14: '',
                strMeasure15: '',
                strCreativeCommonsConfirmed: '',
                dateModified: '',
              },
            ],
          },
        });
      });

      fireEvent.input(screen.getByLabelText(/by name/i), {
        target: { value: 'Margarita' },
      });

      fireEvent.click(screen.getByText(/shake it/i));

      expect(await screen.findByText(/Blue Margarita/i)).toBeInTheDocument();
    });
  });
  describe('When component is instantiated and select an letter...', () => {
    test('search by letter', async () => {
      axios.get = jest.fn(() => {
        return Promise.resolve({
          data: {
            drinks: [
              {
                idDrink: '1234',
                strDrink: 'Mojito',
                strDrinkThumb:
                  'https://www.thecocktaildb.com/images/media/drink/vqwvtp1472668462.jpg',
                strInstructions: '',
                strIngredient1: 'Vodka',
                strIngredient2: '',
                strIngredient3: '',
                strIngredient4: '',
                strIngredient5: '',
                strIngredient6: '',
                strIngredient7: '',
                strIngredient8: '',
                strIngredient9: '',
                strIngredient10: '',
                strIngredient11: '',
                strIngredient12: '',
                strIngredient13: '',
                strIngredient14: '',
                strIngredient15: '',
                strMeasure1: '1 shot',
                strMeasure2: '',
                strMeasure3: '',
                strMeasure4: '',
                strMeasure5: '',
                strMeasure6: '',
                strMeasure7: '',
                strMeasure8: '',
                strMeasure9: '',
                strMeasure10: '',
                strMeasure11: '',
                strMeasure12: '',
                strMeasure13: '',
                strMeasure14: '',
                strMeasure15: '',
                strCreativeCommonsConfirmed: '',
                dateModified: '',
              },
            ],
          },
        });
      });

      userEvent.selectOptions(screen.getByLabelText('By Letter:'), 'M');

      fireEvent.click(screen.getByText(/shake it/i));

      expect(screen.getByRole('option', { name: 'M' }).selected).toBe(true);

      expect(await screen.findByText('Mojito')).toBeInTheDocument();
    });
  });
  describe('When component is instantiated and select if the cocktail has alcohol...', () => {
    test('search by alcoholic', async () => {
      axios.get = jest.fn(() => {
        return Promise.resolve({
          data: {
            drinks: [
              {
                idDrink: '1234',
                strDrink: '1-900-FUK-MEUP',
                strDrinkThumb:
                  'https://www.thecocktaildb.com/images/media/drink/vqwvtp1472668462.jpg',
                strInstructions: '',
                strIngredient1: 'Vodka',
                strIngredient2: '',
                strIngredient3: '',
                strIngredient4: '',
                strIngredient5: '',
                strIngredient6: '',
                strIngredient7: '',
                strIngredient8: '',
                strIngredient9: '',
                strIngredient10: '',
                strIngredient11: '',
                strIngredient12: '',
                strIngredient13: '',
                strIngredient14: '',
                strIngredient15: '',
                strMeasure1: '1 shot',
                strMeasure2: '',
                strMeasure3: '',
                strMeasure4: '',
                strMeasure5: '',
                strMeasure6: '',
                strMeasure7: '',
                strMeasure8: '',
                strMeasure9: '',
                strMeasure10: '',
                strMeasure11: '',
                strMeasure12: '',
                strMeasure13: '',
                strMeasure14: '',
                strMeasure15: '',
                strCreativeCommonsConfirmed: '',
                dateModified: '',
              },
            ],
          },
        });
      });

      userEvent.selectOptions(
        screen.getByLabelText('By Alcoholic:'),
        'Alcoholic'
      );

      fireEvent.click(screen.getByText(/shake it/i));

      expect(await screen.findByText('1-900-FUK-MEUP')).toBeInTheDocument();
    });
  });
  describe('When component is instantiated and select the type of cocktail...', () => {
    test('search by type', async () => {
      axios.get = jest.fn(() => {
        return Promise.resolve({
          data: {
            drinks: [
              {
                idDrink: '1234',
                strDrink: '410 Gone',
                strDrinkThumb:
                  'https://www.thecocktaildb.com/images/media/drink/vqwvtp1472668462.jpg',
                strInstructions: '',
                strIngredient1: 'Vodka',
                strIngredient2: '',
                strIngredient3: '',
                strIngredient4: '',
                strIngredient5: '',
                strIngredient6: '',
                strIngredient7: '',
                strIngredient8: '',
                strIngredient9: '',
                strIngredient10: '',
                strIngredient11: '',
                strIngredient12: '',
                strIngredient13: '',
                strIngredient14: '',
                strIngredient15: '',
                strMeasure1: '1 shot',
                strMeasure2: '',
                strMeasure3: '',
                strMeasure4: '',
                strMeasure5: '',
                strMeasure6: '',
                strMeasure7: '',
                strMeasure8: '',
                strMeasure9: '',
                strMeasure10: '',
                strMeasure11: '',
                strMeasure12: '',
                strMeasure13: '',
                strMeasure14: '',
                strMeasure15: '',
                strCreativeCommonsConfirmed: '',
                dateModified: '',
              },
            ],
          },
        });
      });

      userEvent.selectOptions(
        screen.getByLabelText('By Type:'),
        'Ordinary Drink'
      );

      fireEvent.click(screen.getByText(/shake it/i));

      expect(await screen.findByText('410 Gone')).toBeInTheDocument();
    });
  });
  describe('When component is instantiated and select the type of glass...', () => {
    test('search by glass', async () => {
      axios.get = jest.fn(() => {
        return Promise.resolve({
          data: {
            drinks: [
              {
                idDrink: '1234',
                strDrink: 'A. J.',
                strDrinkThumb:
                  'https://www.thecocktaildb.com/images/media/drink/vqwvtp1472668462.jpg',
                strInstructions: '',
                strIngredient1: 'Vodka',
                strIngredient2: '',
                strIngredient3: '',
                strIngredient4: '',
                strIngredient5: '',
                strIngredient6: '',
                strIngredient7: '',
                strIngredient8: '',
                strIngredient9: '',
                strIngredient10: '',
                strIngredient11: '',
                strIngredient12: '',
                strIngredient13: '',
                strIngredient14: '',
                strIngredient15: '',
                strMeasure1: '1 shot',
                strMeasure2: '',
                strMeasure3: '',
                strMeasure4: '',
                strMeasure5: '',
                strMeasure6: '',
                strMeasure7: '',
                strMeasure8: '',
                strMeasure9: '',
                strMeasure10: '',
                strMeasure11: '',
                strMeasure12: '',
                strMeasure13: '',
                strMeasure14: '',
                strMeasure15: '',
                strCreativeCommonsConfirmed: '',
                dateModified: '',
              },
            ],
          },
        });
      });

      userEvent.selectOptions(
        screen.getByLabelText('By Glass:'),
        'Cocktail glass'
      );

      fireEvent.click(screen.getByText(/shake it/i));

      expect(await screen.findByText('A. J.')).toBeInTheDocument();
    });
  });
  describe('When component is instantiated and select an ingredients...', () => {
    test('search by single ingredient', async () => {
      axios.get = jest.fn(() => {
        return Promise.resolve({
          data: {
            drinks: [
              {
                idDrink: '1234',
                strDrink: '155 Belmont',
                strDrinkThumb:
                  'https://www.thecocktaildb.com/images/media/drink/vqwvtp1472668462.jpg',
                strInstructions: '',
                strIngredient1: 'Vodka',
                strIngredient2: '',
                strIngredient3: '',
                strIngredient4: '',
                strIngredient5: '',
                strIngredient6: '',
                strIngredient7: '',
                strIngredient8: '',
                strIngredient9: '',
                strIngredient10: '',
                strIngredient11: '',
                strIngredient12: '',
                strIngredient13: '',
                strIngredient14: '',
                strIngredient15: '',
                strMeasure1: '1 shot',
                strMeasure2: '',
                strMeasure3: '',
                strMeasure4: '',
                strMeasure5: '',
                strMeasure6: '',
                strMeasure7: '',
                strMeasure8: '',
                strMeasure9: '',
                strMeasure10: '',
                strMeasure11: '',
                strMeasure12: '',
                strMeasure13: '',
                strMeasure14: '',
                strMeasure15: '',
                strCreativeCommonsConfirmed: '',
                dateModified: '',
              },
            ],
          },
        });
      });

      userEvent.selectOptions(
        screen.getByLabelText('By Ingredient/s:'),
        'Vodka'
      );

      fireEvent.click(screen.getByText(/shake it/i));

      expect(await screen.findByText('155 Belmont')).toBeInTheDocument();
    });
  });
  describe('When component is instantiated and select more than one ingredient...', () => {
    test('search by multiple ingredient', async () => {
      axios.get = jest.fn(() => {
        return Promise.resolve({
          data: {
            drinks: [
              {
                idDrink: '1234',
                strDrink: 'Army Special',
                strDrinkThumb:
                  'https://www.thecocktaildb.com/images/media/drink/vqwvtp1472668462.jpg',
                strInstructions: '',
                strIngredient1: 'Vodka',
                strIngredient2: '',
                strIngredient3: '',
                strIngredient4: '',
                strIngredient5: '',
                strIngredient6: '',
                strIngredient7: '',
                strIngredient8: '',
                strIngredient9: '',
                strIngredient10: '',
                strIngredient11: '',
                strIngredient12: '',
                strIngredient13: '',
                strIngredient14: '',
                strIngredient15: '',
                strMeasure1: '1 shot',
                strMeasure2: '',
                strMeasure3: '',
                strMeasure4: '',
                strMeasure5: '',
                strMeasure6: '',
                strMeasure7: '',
                strMeasure8: '',
                strMeasure9: '',
                strMeasure10: '',
                strMeasure11: '',
                strMeasure12: '',
                strMeasure13: '',
                strMeasure14: '',
                strMeasure15: '',
                strCreativeCommonsConfirmed: '',
                dateModified: '',
              },
            ],
          },
        });
      });

      userEvent.selectOptions(
        screen.getByLabelText('By Ingredient/s:'),
        'Vodka'
      );
      userEvent.selectOptions(screen.getByLabelText('By Ingredient/s:'), 'Gin');

      fireEvent.click(screen.getByText(/shake it/i));

      expect(await screen.findByText('Army Special')).toBeInTheDocument();

      expect(1 + 1).toBe(2);
    });
  });
  describe('When component is instantiated and select an ingredient one by one...', () => {
    test('search by single ingredient deleting one', async () => {
      axios.get = jest.fn(() => {
        return Promise.resolve({
          data: {
            drinks: [
              {
                idDrink: '1234',
                strDrink: '69 Special',
                strDrinkThumb:
                  'https://www.thecocktaildb.com/images/media/drink/vqwvtp1472668462.jpg',
                strInstructions: '',
                strIngredient1: 'Vodka',
                strIngredient2: '',
                strIngredient3: '',
                strIngredient4: '',
                strIngredient5: '',
                strIngredient6: '',
                strIngredient7: '',
                strIngredient8: '',
                strIngredient9: '',
                strIngredient10: '',
                strIngredient11: '',
                strIngredient12: '',
                strIngredient13: '',
                strIngredient14: '',
                strIngredient15: '',
                strMeasure1: '1 shot',
                strMeasure2: '',
                strMeasure3: '',
                strMeasure4: '',
                strMeasure5: '',
                strMeasure6: '',
                strMeasure7: '',
                strMeasure8: '',
                strMeasure9: '',
                strMeasure10: '',
                strMeasure11: '',
                strMeasure12: '',
                strMeasure13: '',
                strMeasure14: '',
                strMeasure15: '',
                strCreativeCommonsConfirmed: '',
                dateModified: '',
              },
            ],
          },
        });
      });

      userEvent.selectOptions(
        screen.getByLabelText('By Ingredient/s:'),
        'Vodka'
      );
      userEvent.selectOptions(screen.getByLabelText('By Ingredient/s:'), 'Gin');

      userEvent.click(document.querySelector('.fa-trash-alt'));

      fireEvent.click(screen.getByText(/shake it/i));

      expect(await screen.findByText('69 Special')).toBeInTheDocument();

      expect(1 + 1).toBe(2);
    });
  });
});
