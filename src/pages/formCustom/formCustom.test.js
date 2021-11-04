import {
  fireEvent,
  prettyDOM,
  render,
  screen,
  getByLabelText,
} from '@testing-library/react';
import App from '../../App';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { useAuth0 } from '@auth0/auth0-react';
import DataContextProvider, { DataContext } from '../../context/DataContext';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';

const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
};
jest.mock('@auth0/auth0-react');

describe('Given the component FormCustom...', () => {
  describe('When component is instantiated...', () => {
    test('custom form show labels and toggles inputs', async () => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });

      const history = createMemoryHistory();
      history.push('/create-custom');

      render(
        <DataContextProvider>
          <Router history={history}>
            <App />
          </Router>
        </DataContextProvider>
      );

      expect(await screen.findByText(/create cocktail/i)).toBeInTheDocument();
      expect(await screen.findByText(/name/i)).toBeInTheDocument();
      expect(await screen.findByText(/image url/i)).toBeInTheDocument();
      expect(await screen.findByText(/recipe/i)).toBeInTheDocument();
      expect(await screen.findByText(/type/i)).toBeInTheDocument();
      expect(await screen.findAllByText(/alcoholic/i)).toBeTruthy();
      expect(await screen.findAllByText(/glass/i)).toBeTruthy();
      expect(await screen.findByText(/ingredients/i)).toBeInTheDocument();

      expect(1 + 1).toBe(2);
    });
  });
  describe('When component is instantiated create a cocktail...', () => {
    test('create cocktail', async () => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });

      const history = createMemoryHistory();
      history.push('/create-custom');

      render(
        <DataContextProvider>
          <Router history={history}>
            <App />
          </Router>
        </DataContextProvider>
      );

      expect(await screen.findByText(/create cocktail/i)).toBeInTheDocument();
      expect(await screen.findByText(/name/i)).toBeInTheDocument();
      expect(await screen.findByText(/image url/i)).toBeInTheDocument();
      expect(await screen.findByText(/recipe/i)).toBeInTheDocument();
      expect(await screen.findByText(/type/i)).toBeInTheDocument();
      expect(await screen.findAllByText(/alcoholic/i)).toBeTruthy();
      expect(await screen.findAllByText(/glass/i)).toBeTruthy();
      expect(await screen.findByText(/ingredients/i)).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: 'My custom' },
      });
      fireEvent.change(screen.getByLabelText(/image url/i), {
        target: {
          value:
            'https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg',
        },
      });
      fireEvent.change(screen.getByLabelText(/recipe/i), {
        target: { value: 'Custom recipe' },
      });
      userEvent.selectOptions(
        await screen.findByLabelText(/type/i),
        'Ordinary Drink'
      );
      userEvent.selectOptions(
        await screen.findByLabelText(/alcoholic/i),
        'Alcoholic'
      );
      userEvent.selectOptions(
        await screen.findByLabelText(/glass/i),
        'Cocktail glass'
      );

      userEvent.selectOptions(
        await screen.findByLabelText(/ingredients/i),
        'Vodka'
      );

      userEvent.selectOptions(
        await screen.findByLabelText(/ingredients/i),
        'Gin'
      );

      fireEvent.change(await screen.findByLabelText(/Gin/i), {
        target: { value: '125ml' },
      });

      fireEvent.click(screen.getByText(/add/i));

      expect(await screen.findAllByText(/My custom/i)).toBeTruthy();

      expect(1 + 1).toBe(2);
    });
  });
  describe('When component is instantiated modify a cocktail...', () => {
    test('modify cocktail', async () => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });

      const history = createMemoryHistory();
      history.push('/custom');

      render(
        <DataContextProvider>
          <Router history={history}>
            <App />
          </Router>
        </DataContextProvider>
      );

      const inputs = await screen.findAllByText(/my custom/i);

      fireEvent.click(inputs[0]);

      fireEvent.click(await screen.findByTestId('edit-button'));

      fireEvent.change(screen.getByLabelText(/name/i), {
        target: { value: 'El mio custom' },
      });

      fireEvent.click(screen.getByText(/add/i));

      expect(await screen.findAllByText(/El mio custom/i)).toBeTruthy();

      expect(1 + 1).toBe(2);
    });
  });
});
