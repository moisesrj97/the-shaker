import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Thumbnail from './Thumbnail';

describe('Given the component Thumbnail...', () => {
  describe('When component is instantiated...', () => {
    test('renders Thumbnail', () => {
      render(
        <BrowserRouter>
          <Thumbnail
            sampleData={{
              strDrink: 'Radioactive Long Island Iced Tea',
              strDrinkThumb:
                'https://www.thecocktaildb.com/images/media/drink/rdvqmh1503563512.jpg',
              idDrink: '16984',
            }}
          />
        </BrowserRouter>
      );

      expect(
        screen.getByText(/Radioactive Long Island Iced Tea/i)
      ).toBeInTheDocument();
      expect(screen.getByRole('img')).toBeInTheDocument();
      expect(screen.getByRole('link')).toBeInTheDocument();
    });
  });
});
