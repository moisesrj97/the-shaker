import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Thumbnail from './Thumbnail';

describe('Given the component Thumbnail...', () => {
  describe('When component is instantiated...', () => {
    test('renders Thumbnail', () => {
      const history = createMemoryHistory();
      history.push('/');

      render(
        <Router history={history}>
          <Thumbnail
            sampleData={{
              strDrink: 'Radioactive Long Island Iced Tea',
              strDrinkThumb:
                'https://www.thecocktaildb.com/images/media/drink/rdvqmh1503563512.jpg',
              idDrink: '16984',
            }}
          />
        </Router>
      );

      expect(
        screen.getByText(/Radioactive Long Island Iced Tea/i)
      ).toBeInTheDocument();
    });
  });
});
