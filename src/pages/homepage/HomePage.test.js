import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../../App';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import DataContextProvider from '../../context/DataContext';

describe('Given the component homePage...', () => {
  describe('When component is instanciated...', () => {
    test('renders homepage info', () => {
      const history = createMemoryHistory();
      history.push('/');

      render(
        <Router history={history}>
          <App />
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
        expect(history.location.pathname).toMatch(/\/details\/\d+/);
      });
    });
  });
});
