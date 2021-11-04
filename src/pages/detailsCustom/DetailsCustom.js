import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { DataContext } from '../../context/DataContext';
import UsersApi from '../../services/UsersAPI';
import UsersAPI from '../../services/UsersAPI';
import { Link, useHistory } from 'react-router-dom';
import { removeCustom } from '../../reducer/actionMaker';

const DetailsCustom = () => {
  const { store, dispatch } = useContext(DataContext);

  const [state, setState] = useState({
    status: '',
    id: '',
    name: '',
    thumb: '',
    recipe: '',
    type: '',
    glass: '',
    alcoholic: '',
    ingredients: [''],
    amount: [''],
  });

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchedCocktail = store.user.custom.find((e) => e.id === id);

    if (fetchedCocktail === undefined) {
      setState({ id: 1, status: 'ERROR' });
    } else {
      setState({
        ...state,
        id: fetchedCocktail.id,
        name: fetchedCocktail.name,
        thumb: fetchedCocktail.thumb,
        recipe: fetchedCocktail.recipe,
        type: fetchedCocktail.type,
        glass: fetchedCocktail.glass,
        alcoholic: fetchedCocktail.alcoholic,
        ingredients: fetchedCocktail.ingredientes,
        amount: fetchedCocktail.ingredientesAmount,
      });
    }
  }, [id, state.id]);

  const handleShare = async () => {
    const response = await fetch(state.thumb);
    const blob = await response.blob();
    const file = new File([blob], 'image.jpg', { type: blob.type });

    navigator.share({
      url: state.name,
      title: state.name,
      text: state.name + ': ' + state.recipe,
      files: [file],
    });
  };

  const handleDelete = () => {
    UsersAPI.removeCustom(store.user.id, state.id).then((response) => {
      dispatch(removeCustom(state.id));
      history.push('/custom');
    });
  };

  return (
    <section className="detail">
      {state.status === 'ERROR' ? (
        <h2 className="favorites">
          Sorry, we couldn't find your drink! Ask to Gerard(Maybe he stole it)!
        </h2>
      ) : (
        <>
          <div className="detail__image">
            <img className="detail__image-photo" src={state.thumb} alt={''} />
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
              <div className="detail__header">
                <p className="detail__name">{state.name}</p>
                <i
                  onClick={() =>
                    history.push({
                      pathname: '/create-custom',
                      data: state,
                    })
                  }
                  className="detail__edit fas fa-pencil-alt"
                  data-testid="edit-button"
                ></i>
              </div>
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
                data-testid="share-icon"
              ></i>
              <i
                className="detail__share far fa-trash-alt"
                onClick={handleDelete}
                data-testid="delete-button"
              ></i>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default DetailsCustom;
