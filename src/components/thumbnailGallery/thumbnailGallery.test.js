import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ThumbnailGallery from './ThumbnailGallery';

const sampleData = {
  drinks: [
    {
      strDrink: '3-Mile Long Island Iced Tea',
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/rrtssw1472668972.jpg',
      idDrink: '15300',
    },
    {
      strDrink: 'Army special',
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/55muhh1493068062.jpg',
      idDrink: '17066',
    },
    {
      strDrink: 'Cherry Electric Lemonade',
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/tquyyt1451299548.jpg',
      idDrink: '17174',
    },
    {
      strDrink: 'Jitterbug',
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/wwqvrq1441245318.jpg',
      idDrink: '16178',
    },
    {
      strDrink: 'Long Island Iced Tea',
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/wx7hsg1504370510.jpg',
      idDrink: '17204',
    },
    {
      strDrink: 'Long Island Tea',
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/nkwr4c1606770558.jpg',
      idDrink: '11002',
    },
    {
      strDrink: 'National Aquarium',
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/dlw0om1503565021.jpg',
      idDrink: '13192',
    },
    {
      strDrink: 'Radioactive Long Island Iced Tea',
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/rdvqmh1503563512.jpg',
      idDrink: '16984',
    },
    {
      strDrink: 'Vesper',
      strDrinkThumb:
        'https://www.thecocktaildb.com/images/media/drink/mtdxpa1504374514.jpg',
      idDrink: '17218',
    },
  ],
};

test('renders Thumbnail', () => {
  const history = createMemoryHistory();
  history.push('/');

  render(
    <Router history={history}>
      <ThumbnailGallery sampleData={sampleData} />
    </Router>
  );

  expect(
    screen.getByText(/Radioactive Long Island Iced Tea/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/Army special/i)).toBeInTheDocument();
  expect(screen.getByText(/Cherry Electric Lemonade/i)).toBeInTheDocument();

  expect(screen.getAllByRole('img')).toHaveLength(9);
});

test('renders Thumbnail without cocktails', () => {
  const history = createMemoryHistory();
  history.push('/');

  render(
    <Router history={history}>
      <ThumbnailGallery sampleData={{ drinks: null }} />
    </Router>
  );
  expect(screen.getByText(/No cocktails to show!/i)).toBeInTheDocument();
});
