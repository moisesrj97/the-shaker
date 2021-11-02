import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import CocktailsApi from '../../services/CocktailsAPI';
import { DataContext } from '../../context/DataContext';
import UsersApi from '../../services/UsersAPI';
import './Details.scss';
import { useAuth0 } from '@auth0/auth0-react';
import { addFav, removeFav } from '../../reducer/actionMaker';
import UsersAPI from '../../services/UsersAPI';

const Details = () => {
  const { store, dispatch } = useContext(DataContext);

  const [state, setState] = useState({
    isFavorite: false,
    favoriteId: '',
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
  const { user } = useAuth0();

  useEffect(() => {
    CocktailsApi.searchByCocktailId(id).then((response) => {
      setState({
        ...state,
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

  useEffect(() => {
    if (store.user.fav.some((e) => e.apiId === state.id)) {
      const favId = store.user.fav.find((e) => e.apiId === state.id).id;
      setState({ ...state, isFavorite: true, favoriteId: favId });
    } else {
      setState({ ...state, isFavorite: false, favoriteId: '' });
    }
  }, [store]);

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

  const handleAddFav = async () => {
    UsersApi.addFavorite(store.user.id, {
      name: state.name,
      thumb: state.img,
      apiId: state.id,
    }).then((response) => dispatch(addFav(response)));
  };

  const handleDeleteFav = async () => {
    UsersAPI.removeFavorite(store.user.id, state.favoriteId).then((response) =>
      dispatch(removeFav(state.favoriteId))
    );
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
          <h2 className="detail__name">
            {state.name}{' '}
            {user && state.isFavorite === true && (
              <i
                className="detail__star fas fa-star"
                onClick={handleDeleteFav}
              ></i>
            )}
            {user && state.isFavorite === false && (
              <i
                className=" detail__star far fa-star"
                onClick={handleAddFav}
              ></i>
            )}
          </h2>
          <div>
            <h2 className="detail__title">Ingredients:</h2>
          </div>
          <ul className="detail__ingredients">
            {state.ingredients.map((e, index) => {
              if (e !== null && e !== '') {
                return (
                  <li key={index}>
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
            className="detail__share far fa-share-square"
            onClick={handleShare}
          ></i>
        </div>
      </div>
    </section>
  );
};

export default Details;
