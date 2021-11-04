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

const fakeValue = {
  store: {
    user: {
      id: 'moisesrj97@gmail.com',
      fav: [
        {
          id: '',
          name: '',
          thumb: '',
          apiId: '',
        },
        {
          name: '9 1/2 Weeks',
          thumb:
            'https://www.thecocktaildb.com/images/media/drink/xvwusr1472669302.jpg',
          apiId: '16108',
          id: '235685a0-608e-43eb-801c-46ed22ebbf88',
        },
        {
          name: '24k nightmare',
          thumb:
            'https://www.thecocktaildb.com/images/media/drink/yyrwty1468877498.jpg',
          apiId: '17060',
          id: 'e64ab96a-5ea1-42da-8a14-32e3b506a106',
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
      types: [
        'Ordinary Drink',
        'Cocktail',
        'Milk / Float / Shake',
        'Other/Unknown',
        'Cocoa',
        'Shot',
        'Coffee / Tea',
        'Homemade Liqueur',
        'Punch / Party Drink',
        'Beer',
        'Soft Drink / Soda',
      ],
      glasses: [
        'Highball glass',
        'Cocktail glass',
        'Old-fashioned glass',
        'Whiskey Glass',
        'Collins glass',
        'Pousse cafe glass',
        'Champagne flute',
        'Whiskey sour glass',
        'Cordial glass',
        'Brandy snifter',
        'White wine glass',
        'Nick and Nora Glass',
        'Hurricane glass',
        'Coffee mug',
        'Shot glass',
        'Jar',
        'Irish coffee cup',
        'Punch bowl',
        'Pitcher',
        'Pint glass',
        'Copper Mug',
        'Wine Glass',
        'Beer mug',
        'Margarita/Coupette glass',
        'Beer pilsner',
        'Beer Glass',
        'Parfait glass',
        'Mason jar',
        'Margarita glass',
        'Martini Glass',
        'Balloon Glass',
        'Coupe Glass',
      ],
      alcoholic: ['Alcoholic', 'Non alcoholic', 'Optional alcohol'],
      ingredients: [
        '151 proof rum',
        '7-up',
        'Absinthe',
        'Absolut Kurant',
        'Absolut Peppar',
        'Absolut Vodka',
        'Absolut citron',
        'Advocaat',
        'Aejo Rum',
        'Aftershock',
        'Agave Syrup',
        'Ale',
        'Allspice',
        'Allspice Dram',
        'Almond',
        'Almond Flavoring',
        'Amaretto',
        'Amaro Montenegro',
        'Angelica Root',
        'Angostura Bitters',
        'Anis',
        'Anise',
        'Anisette',
        'Aperol',
        'Apfelkorn',
        'Apple',
        'Apple Brandy',
        'Apple Cider',
        'Apple Juice',
        'Apple Schnapps',
        'Applejack',
        'Apricot',
        'Apricot Brandy',
        'Apricot Nectar',
        'Aquavit',
        'Arrack',
        'Asafoetida',
        'Averna',
        'Añejo Rum',
        'Bacardi',
        'Bacardi Limon',
        'Baileys Irish Cream',
        'Banana',
        'Banana Liqueur',
        'Banana Rum',
        'Banana Syrup',
        'Barenjager',
        'Basil',
        'Beef Stock',
        'Beer',
        'Benedictine',
        'Berries',
        'Bitter lemon',
        'Bitters',
        'Black Pepper',
        'Black Rum',
        'Black Sambuca',
        'Blackberries',
        'Blackberry Brandy',
        'Blackberry Schnapps',
        'Blackcurrant Cordial',
        'Blackcurrant Schnapps',
        'Blackcurrant Squash',
        'Blackstrap rum',
        'Blended Scotch',
        'Blended Whiskey',
        'Blood Orange',
        'Blue Curacao',
        'Blue Maui',
        'Blueberries',
        'Blueberry Schnapps',
        'Bourbon',
        'Brandy',
        'Brown Sugar',
        'Butter',
        'Butterscotch Schnapps',
        'Cachaca',
        'Calvados',
        'Campari',
        'Canadian Whisky',
        'Candy',
        'Cantaloupe',
        'Caramel Coloring',
        'Caramel Sauce',
        'Carbonated Soft Drink',
        'Carbonated Water',
        'Cardamom',
        'Cayenne Pepper',
        'Celery',
        'Celery Salt',
        'Chambord Raspberry Liqueur',
        'Champagne',
        'Chareau',
        'Cherries',
        'Cherry',
        'Cherry Brandy',
        'Cherry Cola',
        'Cherry Grenadine',
        'Cherry Heering',
        'Cherry Juice',
        'Cherry Liqueur',
        'Chocolate',
        'Chocolate Ice-cream',
        'Chocolate Liqueur',
        'Chocolate Milk',
        'Chocolate Sauce',
        'Chocolate Syrup',
        'Cider',
        'Cinnamon',
        'Cinnamon Schnapps',
        'Cinnamon Whisky',
        'Citrus Vodka',
        'Clamato Juice',
        'Cloves',
        'Club Soda',
        'Coca-Cola',
        'Cocchi Americano',
        'Cocktail Onion',
        'Cocoa Powder',
        'Coconut Cream',
        'Coconut Liqueur',
        'Coconut Milk',
        'Coconut Rum',
        'Coconut Syrup',
        'Coffee',
        'Coffee Brandy',
        'Coffee Liqueur',
        'Cognac',
        'Cointreau',
        'Cola',
        'Cold Water',
        'Condensed Milk',
        'Coriander',
        'Corn Syrup',
        'Cornstarch',
        'Corona',
        'Cranberries',
        'Cranberry Juice',
        'Cranberry Liqueur',
        'Cranberry Vodka',
        'Cream',
        'Cream Sherry',
        'Cream Soda',
        'Cream of Coconut',
        'Creme De Almond',
        'Creme De Banane',
        'Creme De Cacao',
        'Creme De Cassis',
        'Creme De Noyaux',
        'Creme Fraiche',
        'Creme de Mure',
        'Creme de Violette',
        'Crown Royal',
        'Crystal Light',
        'Cucumber',
        'Cumin Powder',
        'Cumin Seed',
        'Curacao',
        'Cynar',
        'Daiquiri Mix',
        'Dark Chocolate',
        'Dark Creme De Cacao',
        'Dark Rum',
        'Dark Soy Sauce',
        'Demerara Sugar',
        'Diet Coke',
        'Dr. Pepper',
        'Drambuie',
        'Dried Oregano',
        'Dry Curacao',
        'Dry Vermouth',
        'Dubonnet Blanc',
        'Dubonnet Rouge',
        'Egg',
        'Egg White',
        'Egg Yolk',
        'Eggnog',
        'Elderflower cordial',
        'Erin Cream',
        'Espresso',
        'Everclear',
        'Falernum',
        'Fanta',
        'Fennel Seeds',
        'Fernet-Branca',
        'Figs',
        'Firewater',
        'Flaked Almonds',
        'Food Coloring',
        'Forbidden Fruit',
        'Frangelico',
        'Fresca',
        'Fresh Basil',
        'Fresh Lemon Juice',
        'Fresh Lime Juice',
        'Fresh Mint',
        'Fruit',
        'Fruit Juice',
        'Fruit Punch',
        'Galliano',
        'Garlic Sauce',
        'Gatorade',
        'Gin',
        'Ginger',
        'Ginger Ale',
        'Ginger Beer',
        'Ginger Syrup',
        'Glycerine',
        'Godiva Liqueur',
        'Gold Tequila',
        'Gold rum',
        'Goldschlager',
        'Grain Alcohol',
        'Grand Marnier',
        'Granulated Sugar',
        'Grape juice',
        'Grape soda',
        'Grapefruit Juice',
        'Grapes',
        'Green Chartreuse',
        'Green Creme de Menthe',
        'Green Ginger Wine',
        'Green Olives',
        'Grenadine',
        'Ground Ginger',
        'Guava juice',
        'Guinness',
        'Guinness stout',
        'Habanero Peppers',
        'Half-and-half',
        'Hawaiian punch',
        'Hazelnut liqueur',
        'Heavy cream',
        'Honey',
        'Honey syrup',
        'Hooch',
        'Hot Chocolate',
        'Hot Damn',
        'Hot Sauce',
        'Hpnotiq',
        'Ice',
        'Ice-Cream',
        'Iced tea',
        'Ilegal Joven mezcal',
        'Irish Whiskey',
        'Irish cream',
        'Islay single malt Scotch',
        'Jack Daniels',
        'Jagermeister',
        'Jello',
        'Jelly',
        'Jim Beam',
        'Johnnie Walker',
        'Kahlua',
        'Key Largo Schnapps',
        'Kirschwasser',
        'Kiwi',
        'Kiwi liqueur',
        'Kool-Aid',
        'Kummel',
        'Lager',
        'Lavender',
        'Lemon Juice',
        'Lemon Peel',
        'Lemon soda',
        'Lemon vodka',
        'Lemon-lime soda',
        'Lemonade',
        'Licorice Root',
        'Light Cream',
        'Light Rum',
        'Lillet',
        'Lillet Blanc',
        'Lime',
        'Lime Juice',
        'Lime Peel',
        'Lime juice cordial',
        'Lime liqueur',
        'Lime vodka',
        'Limeade',
        'Madeira',
        'Malibu Rum',
        'Mandarin',
        'Mandarine napoleon',
        'Mango',
        'Maple syrup',
        'Maraschino Cherry',
        'Maraschino Liqueur',
        'Maraschino cherry juice',
        'Margarita mix',
        'Marjoram leaves',
        'Marshmallows',
        'Martini Bianco',
        'Martini Extra Dry',
        'Martini Rosso',
        'Maui',
        'Melon Liqueur',
        'Melon Vodka',
        'Mezcal',
        'Midori',
        'Midori Melon Liqueur',
        'Milk',
        'Mini-snickers bars',
        'Mint',
        'Mint syrup',
        'Mountain Dew',
        'Nocino',
        'Nutmeg',
        'Olive',
        'Olive Brine',
        'Olive Oil',
        'Onion',
        'Orange',
        'Orange Bitters',
        'Orange Curacao',
        'Orange Juice',
        'Orange Peel',
        'Orange Slice',
        'Orange Soda',
        'Orange liqueur',
        'Orange rum',
        'Orange spiral',
        'Orange vodka',
        'Oreo cookie',
        'Orgeat Syrup',
        'Ouzo',
        'Oyster Sauce',
        'Papaya',
        'Papaya juice',
        'Parfait amour',
        'Passion fruit juice',
        'Passion fruit syrup',
        'Passoa',
        'Peach',
        'Peach Bitters',
        'Peach Nectar',
        'Peach Schnapps',
        'Peach Vodka',
        'Peach brandy',
        'Peach juice',
        'Peach liqueur',
        'Peachtree schnapps',
        'Peanut Oil',
        'Pepper',
        'Peppermint Schnapps',
        'Peppermint extract',
        'Pepsi Cola',
        'Pernod',
        'Peychaud bitters',
        'Pina colada mix',
        'Pineapple',
        'Pineapple Juice',
        'Pineapple Syrup',
        'Pineapple rum',
        'Pineapple vodka',
        'Pineapple-orange-banana juice',
        'Pink lemonade',
        'Pisang Ambon',
        'Pisco',
        'Plain Chocolate',
        'Plain Flour',
        'Plums',
        'Pomegranate juice',
        'Port',
        'Powdered Sugar',
        'Prosecco',
        'Purple passion',
        'Raisins',
        'Ramazzotti',
        'Raspberry Jam',
        'Raspberry Juice',
        'Raspberry Liqueur',
        'Raspberry Vodka',
        'Raspberry cordial',
        'Raspberry schnapps',
        'Raspberry syrup',
        'Red Bull',
        'Red Chile Flakes',
        'Red Chili Flakes',
        'Red Hot Chili Flakes',
        'Red Wine',
        'Rhubarb',
        'Ricard',
        'Rock Salt',
        'Root beer',
        'Root beer schnapps',
        'Rose',
        'Rosemary',
        'Rosemary Syrup',
        'Roses sweetened lime juice',
        'Rosewater',
        'Rosso Vermouth',
        'Ruby Port',
        'Rum',
        'Rumple Minze',
        'Rye Whiskey',
        'Sake',
        'Salt',
        'Salted Chocolate',
        'Sambuca',
        'Sarsaparilla',
        'Schnapps',
        'Schweppes Lemon',
        'Schweppes Russchian',
        'Scotch',
        'Sherbet',
        'Sherry',
        'Singani',
        'Sirup of roses',
        'Sloe Gin',
        'Soda Water',
        'Sour Apple Pucker',
        'Sour Mix',
        'Southern Comfort',
        'Soy Milk',
        'Soy Sauce',
        'Soya Milk',
        'Soya Sauce',
        'Spiced Rum',
        'Sprite',
        'Squeezed Orange',
        'Squirt',
        'St. Germain',
        'Strawberries',
        'Strawberry Schnapps',
        'Strawberry juice',
        'Strawberry liqueur',
        'Strawberry syrup',
        'Sugar',
        'Sugar Syrup',
        'Sunny delight',
        'Surge',
        'Swedish punsch',
        'Sweet Cream',
        'Sweet Vermouth',
        'Sweet and Sour',
        'Tabasco Sauce',
        'Tang',
        'Tawny port',
        'Tea',
        'Tennessee whiskey',
        'Tequila',
        'Tequila rose',
        'Thyme',
        'Tia Maria',
        'Tomato',
        'Tomato Juice',
        'Tonic Water',
        'Triple Sec',
        'Tropicana',
        'Tuaca',
        'Vanilla',
        'Vanilla Ice-Cream',
        'Vanilla extract',
        'Vanilla liqueur',
        'Vanilla schnapps',
        'Vanilla syrup',
        'Vanilla vodka',
        'Vermouth',
        'Vinegar',
        'Vodka',
        'Water',
        'Watermelon',
        'Watermelon schnapps',
        'Whipped Cream',
        'Whipping Cream',
        'Whiskey',
        'Whisky',
        'White Creme de Menthe',
        'White Rum',
        'White Vermouth',
        'White Vinegar',
        'White Wine',
        'White chocolate liqueur',
        'White grape juice',
        'White port',
        'Wild Turkey',
        'Wildberry schnapps',
        'Wine',
        'Worcestershire Sauce',
        'Wormwood',
        'Yeast',
        'Yellow Chartreuse',
        'Yoghurt',
        'Yukon Jack',
        'Zima',
        'lemon',
        'lemon-lime',
      ],
    },
  },
};

const user = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
};

describe('Given the component SearchForm...', () => {
  describe('When component is instantiated...', () => {
    jest.mock('@auth0/auth0-react');

    test('search form show labels and toggles inputs', async () => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });

      const history = createMemoryHistory();
      history.push('/search');

      render(
        <DataContextProvider>
          <Router history={history}>
            <App />
          </Router>
        </DataContextProvider>
      );

      expect(await screen.findByText(/by name/i)).toBeInTheDocument();
      expect(await screen.findByText(/by letter/i)).toBeInTheDocument();
      expect(await screen.findByText(/by alcoholic/i)).toBeInTheDocument();
      expect(await screen.findByText(/by type/i)).toBeInTheDocument();
      expect(await screen.findByText(/by glass/i)).toBeInTheDocument();
      expect(await screen.findByText(/by ingredient/i)).toBeInTheDocument();
      expect(await screen.findByText(/shake it!/i)).toBeInTheDocument();

      fireEvent.click(await screen.findByText(/by name/i));
      expect(await screen.findByRole('textbox')).toBeInTheDocument();

      expect(1 + 1).toBe(2);
    });
  });
  describe('When component is instantiated and write an cocktail name...', () => {
    test('search by name', async () => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });

      const history = createMemoryHistory();
      history.push('/search');

      render(
        <DataContextProvider>
          <Router history={history}>
            <App />
          </Router>
        </DataContextProvider>
      );

      fireEvent.input(screen.getByLabelText(/by name/i), {
        target: { value: 'Margarita' },
      });

      fireEvent.click(screen.getByText(/shake it/i));

      expect(await screen.findByText(/blue margarita/i)).toBeInTheDocument();

      expect(1 + 1).toBe(2);
    });
  });
  describe('When component is instantiated and select an letter...', () => {
    test('search by letter', async () => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });

      const history = createMemoryHistory();
      history.push('/search');

      render(
        <DataContextProvider>
          <Router history={history}>
            <App />
          </Router>
        </DataContextProvider>
      );

      userEvent.selectOptions(screen.getByLabelText('By Letter:'), 'M');

      fireEvent.click(screen.getByText(/shake it/i));

      expect(screen.getByRole('option', { name: 'M' }).selected).toBe(true);

      expect(await screen.findByText('Mojito')).toBeInTheDocument();

      expect(1 + 1).toBe(2);
    });
  });
  describe('When component is instantiated and select if the cocktail has alcohol...', () => {
    test('search by alcoholic', async () => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });

      const history = createMemoryHistory();
      history.push('/search');

      render(
        <DataContextProvider>
          <Router history={history}>
            <App />
          </Router>
        </DataContextProvider>
      );

      userEvent.selectOptions(
        screen.getByLabelText('By Alcoholic:'),
        'Alcoholic'
      );

      fireEvent.click(screen.getByText(/shake it/i));

      expect(await screen.findByText('1-900-FUK-MEUP')).toBeInTheDocument();

      expect(1 + 1).toBe(2);
    });
  });
  describe('When component is instantiated and select the type of cocktail...', () => {
    test('search by type', async () => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });

      const history = createMemoryHistory();
      history.push('/search');

      render(
        <DataContextProvider>
          <Router history={history}>
            <App />
          </Router>
        </DataContextProvider>
      );

      userEvent.selectOptions(
        screen.getByLabelText('By Type:'),
        'Ordinary Drink'
      );

      fireEvent.click(screen.getByText(/shake it/i));

      expect(await screen.findByText('410 Gone')).toBeInTheDocument();

      expect(1 + 1).toBe(2);
    });
  });
  describe('When component is instantiated and select the type of glass...', () => {
    test('search by glass', async () => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });

      const history = createMemoryHistory();
      history.push('/search');

      render(
        <DataContextProvider>
          <Router history={history}>
            <App />
          </Router>
        </DataContextProvider>
      );

      userEvent.selectOptions(
        screen.getByLabelText('By Glass:'),
        'Cocktail glass'
      );

      fireEvent.click(screen.getByText(/shake it/i));

      expect(await screen.findByText('A. J.')).toBeInTheDocument();

      expect(1 + 1).toBe(2);
    });
  });
  describe('When component is instantiated and select an ingredients...', () => {
    test('search by single ingredient', async () => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });

      const history = createMemoryHistory();
      history.push('/search');

      render(
        <DataContextProvider>
          <Router history={history}>
            <App />
          </Router>
        </DataContextProvider>
      );

      userEvent.selectOptions(
        screen.getByLabelText('By Ingredient/s:'),
        'Vodka'
      );

      fireEvent.click(screen.getByText(/shake it/i));

      expect(await screen.findByText('155 Belmont')).toBeInTheDocument();

      expect(1 + 1).toBe(2);
    });
  });
  describe('When component is instantiated and select more than one ingredient...', () => {
    test('search by multiple ingredient', async () => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });

      const history = createMemoryHistory();
      history.push('/search');

      render(
        <DataContextProvider>
          <Router history={history}>
            <App />
          </Router>
        </DataContextProvider>
      );

      userEvent.selectOptions(
        screen.getByLabelText('By Ingredient/s:'),
        'Vodka'
      );
      userEvent.selectOptions(screen.getByLabelText('By Ingredient/s:'), 'Gin');

      fireEvent.click(screen.getByText(/shake it/i));

      expect(await screen.findByText('Army special')).toBeInTheDocument();

      expect(1 + 1).toBe(2);
    });
  });
  describe('When component is instantiated and select an ingredient one by one...', () => {
    test('search by single ingredient deleting one', async () => {
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });

      const history = createMemoryHistory();
      history.push('/search');

      render(
        <DataContextProvider>
          <Router history={history}>
            <App />
          </Router>
        </DataContextProvider>
      );

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
