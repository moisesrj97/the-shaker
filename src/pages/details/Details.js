import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CocktailsApi from '../../services/CocktailsAPI';

const Details = () => {
  const [state, setState] = useState({
    id: '',
    name: '',
    img: '',
    recipe: '',
    type: '',
    glass: '',
    alcoholic: '',
    ingredients: [''],
    amount: [''],
  });

  const { id } = useParams();

  useEffect(() => {
    CocktailsApi.searchByCocktailId(id).then((response) => {
      setState({
        id: response.drinks[0].idDrink,
        name: response.drinks[0].strDrink,
        img: response.drinks[0].strDrinkThumb,
        recipe: response.drinks[0].strInstructions,
        type: response.drinks[0].strCategory,
        glass: response.drinks[0].strCategory,
        alcoholic: response.drinks[0].strAlcoholic,
        ingredients: [
          response.drinks[0].strIngredient1,
          response.drinks[0].strIngredient2,
          response.drinks[0].strIngredient3,
          response.drinks[0].strIngredient4,
          response.drinks[0].strIngredient5,
          response.drinks[0].strIngredient6,
          response.drinks[0].strIngredient7,
          response.drinks[0].strIngredient8,
          response.drinks[0].strIngredient9,
          response.drinks[0].strIngredient10,
          response.drinks[0].strIngredient11,
          response.drinks[0].strIngredient12,
          response.drinks[0].strIngredient13,
          response.drinks[0].strIngredient14,
          response.drinks[0].strIngredient15,
        ],
        amount: [
          response.drinks[0].strMeasure1,
          response.drinks[0].strMeasure2,
          response.drinks[0].strMeasure3,
          response.drinks[0].strMeasure4,
          response.drinks[0].strMeasure5,
          response.drinks[0].strMeasure6,
          response.drinks[0].strMeasure7,
          response.drinks[0].strMeasure8,
          response.drinks[0].strMeasure9,
          response.drinks[0].strMeasure10,
          response.drinks[0].strMeasure11,
          response.drinks[0].strMeasure12,
          response.drinks[0].strMeasure13,
          response.drinks[0].strMeasure14,
          response.drinks[0].strMeasure15,
        ],
      });
    });
  }, []);

  return <div>Details for {id}</div>;
};

export default Details;
