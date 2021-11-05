import { fireEvent, prettyDOM, render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import App from '../../App';
import { createMemoryHistory } from 'history';
import DataContextProvider from '../../context/DataContext';
import { useAuth0 } from '@auth0/auth0-react';
import UsersAPI from '../../services/UsersAPI';
import { removeFav } from '../../reducer/actionMaker';

jest.mock('@auth0/auth0-react');

const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
};

describe('Given the component Details...', () => {
  describe('When component is instantiated...', () => {
    test('renders Detail text', async () => {
      const history = createMemoryHistory();
      history.push('details/17826');

      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });

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
  });
  describe('When component is instantiated and throw an error...', () => {
    test('renders Detail text with error', async () => {
      const history = createMemoryHistory();
      history.push('details/6666666666');

      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });

      render(
        <DataContextProvider>
          <Router history={history}>
            <App />
          </Router>
        </DataContextProvider>
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
      const history = createMemoryHistory();
      history.push('details/17826');

      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });

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
      expect(await screen.findByTestId('star-empty')).toBeInTheDocument();
      fireEvent.click(await screen.findByTestId('star-empty'));
      expect(await screen.findByTestId('star-full')).toBeInTheDocument();
      fireEvent.click(await screen.findByTestId('star-full'));
      expect(await screen.findByTestId('star-empty')).toBeInTheDocument();
    });
  });
});
