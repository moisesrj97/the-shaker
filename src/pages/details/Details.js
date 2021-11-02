import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CocktailsApi from '../../services/CocktailsAPI';
import './Details.scss';

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
        glass: response.drinks[0].strGlass,
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

  const handleShare = async () => {
    const response = await fetch(state.img);
    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', { type: blob.type });

    navigator.share({
      url: state.name,
      title: state.name,
      text: state.name + ': ' + state.recipe,
      files: [file],
    });
  };

  return (
    <section className="detail">
      <div className="detail__image">
        <img className="detail__image-photo" src={state.img} alt={''} />
        <ul className="detail__hashtag">
          <li>
            <button className="detail__button" type="submit">
              #{state.type}
            </button>
          </li>
          <li>
            <button className="detail__button" type="submit">
              #{state.glass}
            </button>
          </li>
          <li>
            <button className="detail__button" type="submit">
              #{state.alcoholic}
            </button>
          </li>
        </ul>
      </div>
      <div className="detail__description">
        <div>
          <h2 className="detail__name">{state.name}</h2>
          <div>
            <h2 className="detail__title">Ingredients:</h2>
          </div>
          <ul className="detail__ingredients">
            {state.ingredients.map((e, index) => {
              if (e !== null && e !== '') {
                return (
                  <li>
                    {e}: {state.amount[index]}
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div>
          <h3 className="detail__subtitle">Recipe:</h3>
          <div className="detail__recipe">{state.recipe}</div>
          <i
            class="detail__share far fa-share-square"
            onClick={handleShare}
          ></i>
        </div>
      </div>
    </section>
  );
};

export default Details;
