import React, { useState } from 'react';
import SearchForm from '../../components/searchForm/SearchForm';
import ThumbnailGallery from '../../components/thumbnailGallery/ThumbnailGallery';
import CocktailsApi from '../../services/CocktailsAPI';
import './SearchPage.scss';

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

const SearchPage = () => {
  const [cocktails, setCocktails] = useState({ drinks: [] });

  const searchCocktails = (type, query) => {
    console.log(type, query);
    switch (type) {
      case 'byName':
        CocktailsApi.searchByCocktailName(query.join()).then((response) =>
          setCocktails(response)
        );
        break;
      case 'byLetter':
        CocktailsApi.searchCocktailByFirstLetter(query.join()).then(
          (response) => setCocktails(response)
        );
        break;
      case 'byAlcoholic':
        CocktailsApi.searchCocktailByAlcoholic(query.join()).then((response) =>
          setCocktails(response)
        );
        break;
      case 'byType':
        CocktailsApi.searchCocktailByDrinkType(query.join()).then((response) =>
          setCocktails(response)
        );
        break;
      case 'byGlass':
        CocktailsApi.searchCocktailByGlassType(query.join()).then((response) =>
          setCocktails(response)
        );
        break;
      case 'byIngredient':
        CocktailsApi.searchCocktailByMultipleIngredients(query.join()).then(
          (response) => setCocktails(response)
        );
        break;
      default:
        return false;
    }
  };

  return (
    <div className="search-page">
      <SearchForm searchCocktails={searchCocktails} />
      <ThumbnailGallery sampleData={cocktails} />
    </div>
  );
};

export default SearchPage;
