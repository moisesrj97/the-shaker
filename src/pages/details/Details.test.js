import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import App from '../../App';
import { createMemoryHistory } from 'history';
import DataContextProvider from '../../context/DataContext';

test('renders Detail text', async () => {
  const history = createMemoryHistory();
  history.push('details/17826');

  render(
    <DataContextProvider>
      <Router history={history}>
        <App />
      </Router>
    </DataContextProvider>
  );
  expect(await screen.findByText(/#Cocktail/i)).toBeInTheDocument();
  expect(await screen.findByText(/#Whiskey/i)).toBeInTheDocument();
  expect(await screen.findByText(/#Alcoholic/i)).toBeInTheDocument();
  expect(await screen.findByText(/Recipe/i)).toBeInTheDocument();
  expect(await screen.findByText(/Ingredients/i)).toBeInTheDocument();
  expect(await screen.findByText(/The Jimmy Conway/i)).toBeInTheDocument();
  expect(
    await screen.findByText(
      /Fill glass with ice Pour in The Irishman and Disaronno Fill to the top with Cranberry Juice Garnish with a slice of lemon…Enjoy!/i
    )
  ).toBeInTheDocument();
  expect(await screen.findByText(/Irish Whiskey/i)).toBeInTheDocument();
  expect(await screen.findByText(/Amaretto/i)).toBeInTheDocument();
});
