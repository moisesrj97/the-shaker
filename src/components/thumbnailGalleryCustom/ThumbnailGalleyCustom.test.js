import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ThumbnailGalleryCustom from './ThumbnailGalleryCustom';

const sampleData = {
  drinks: [
    {
      status: '',
      id: 'cf8226da-0326-4936-9a5f-d2f5e4d0cba8',
      name: 'Momo',
      thumb:
        'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg/preview',
      recipe: 'adad',
      type: 'Cocktail',
      glass: 'Cocktail glass',
      alcoholic: 'Optional alcohol',
      ingredients: ['', 'Angostura Bitters'],
      amount: ['', 'asd'],
      thumb:
        'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg/preview',
      ingredientes: ['', 'Angostura Bitters', 'Almond'],
      ingredientesAmount: ['', 'asd', '123'],
    },
    {
      status: '',
      id: 'cf8226da-0326-4936-9a5f-d2f5e4d0cba8',
      name: 'Juan',
      thumb:
        'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg/preview',
      recipe: 'adad',
      type: 'Cocktail',
      glass: 'Cocktail glass',
      alcoholic: 'Optional alcohol',
      ingredients: ['', 'Angostura Bitters'],
      amount: ['', 'asd'],
      thumb:
        'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg/preview',
      ingredientes: ['', 'Angostura Bitters', 'Almond'],
      ingredientesAmount: ['', 'asd', '123'],
    },
    {
      status: '',
      id: 'cf8226da-0326-4936-9a5f-d2f5e4d0cba8',
      name: 'Pepe',
      thumb:
        'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg/preview',
      recipe: 'adad',
      type: 'Cocktail',
      glass: 'Cocktail glass',
      alcoholic: 'Optional alcohol',
      ingredients: ['', 'Angostura Bitters'],
      amount: ['', 'asd'],
      thumb:
        'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg/preview',
      ingredientes: ['', 'Angostura Bitters', 'Almond'],
      ingredientesAmount: ['', 'asd', '123'],
    },
  ],
};

describe('Given the component ThumbnailGalleryCustom...', () => {
  describe('When component is instantiated...', () => {
    test('renders Thumbnail', () => {
      render(
        <BrowserRouter>
          <ThumbnailGalleryCustom sampleData={sampleData} />
        </BrowserRouter>
      );

      expect(screen.getByText(/Momo/i)).toBeInTheDocument();
      expect(screen.getByText(/Pepe/i)).toBeInTheDocument();
      expect(screen.getByText(/Juan/i)).toBeInTheDocument();

      expect(screen.getAllByRole('img')).toHaveLength(3);
    });
  });
  describe('When component is instantiated without cocktails...', () => {
    test('renders message error', () => {
      render(
        <BrowserRouter>
          <ThumbnailGalleryCustom sampleData={{ drinks: null }} />
        </BrowserRouter>
      );
      expect(screen.getByText(/No cocktails to show!/i)).toBeInTheDocument();
    });
  });
});
