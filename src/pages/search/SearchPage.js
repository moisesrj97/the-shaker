import React, { useState } from 'react';
import SearchForm from '../../components/searchForm/SearchForm';
import ThumbnailGallery from '../../components/thumbnailGallery/ThumbnailGallery';
import CocktailsApi from '../../services/CocktailsAPI';
import './SearchPage.scss';

const SearchPage = () => {
  const [cocktails, setCocktails] = useState({ drinks: [] });

  const searchCocktails = (type, query) => {
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
