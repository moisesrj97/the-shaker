import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import DataContextProvider from '../../context/DataContext';
import Favorites from './favorites';

const sampleData = {
  fav: [
    {
      name: 'Army special',
      thumb:
        'https://www.thecocktaildb.com/images/media/drink/55muhh1493068062.jpg',
      apiId: '17066',
      id: 'a38f4c09-4cfc-465e-a3a8-75cbdc2cf60c',
    },
    {
      name: 'Bora Bora',
      thumb:
        'https://www.thecocktaildb.com/images/media/drink/xwuqvw1473201811.jpg',
      apiId: '12572',
      id: 'e453e2da-db3d-4e39-8ba8-ffe5b3aeccce',
    },
    {
      name: 'Long Island Iced Tea',
      thumb:
        'https://www.thecocktaildb.com/images/media/drink/wx7hsg1504370510.jpg',
      apiId: '17204',
      id: 'd79a8abf-2c7e-4e98-9adb-5af4ec013f16',
    },
  ],
};

test('renders favorites', () => {
  const history = createMemoryHistory();
  history.push('/');

  render(
    <DataContextProvider>
      <Router history={history}>
        <Favorites sampleData={sampleData} />
      </Router>
    </DataContextProvider>
  );

  expect(screen.getByText(/Long Island Iced Tea/i)).toBeInTheDocument();
  expect(screen.getByText(/Army special/i)).toBeInTheDocument();
  expect(screen.getByText(/Bora Bora/i)).toBeInTheDocument();
});
