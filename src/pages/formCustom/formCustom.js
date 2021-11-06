import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { DataContext } from '../../context/DataContext';
import { createCustom, updateCustom } from '../../reducer/actionMaker';
import UsersAPI from '../../services/UsersAPI';
import './formCustom.scss';

const FormCustom = () => {
  const history = useHistory();
  const { data } = useLocation();

  const myState =
    data === undefined
      ? {
          method: 'post',
          name: '',
          thumb: '',
          recipe: '',
          type: '',
          glass: '',
          alcoholic: '',
        }
      : { ...data, method: 'put' };

  const [state, setState] = useState(myState);

  const myIngredients =
    data === undefined
      ? [{ name: '', amount: '' }]
      : data.ingredients.map((e, index) => {
          return { name: e, amount: data.amount[index] };
        });

  const [ingredients, setIngredients] = useState(myIngredients);

  const { store, dispatch } = useContext(DataContext);

  const handleChange = (evt) => {
    setState({ ...state, [evt.target.name]: evt.target.value });
  };

  const handleIngredientInput = (evt) => {
    setIngredients(
      ingredients.map((e) => {
        if (e.name === evt.target.name) {
          return { ...e, amount: evt.target.value };
        } else {
          return { ...e };
        }
      })
    );
  };

  const handleSubmit = () => {
    const newCocktail = {
      ...state,
      method: undefined,
      thumb: state.thumb,
      ingredientes: ingredients.map((e) => e.name),
      ingredientesAmount: ingredients.map((e) => e.amount),
    };

    if (state.method === 'post') {
      UsersAPI.createCustom(store.user.id, newCocktail).then((response) => {
        dispatch(createCustom(response));
        history.push('/custom');
      });
    } else {
      UsersAPI.updateCustom(store.user.id, state.id, newCocktail).then(
        (response) => {
          dispatch(updateCustom(response));
          history.push('/custom');
        }
      );
    }
  };

  return (
    <div className="boxForm">
      <h2 className="favorites">Create Cocktail</h2>
      <div className="boxForm__sections">
        <div className="boxForm__sections-section">
          <div className="">
            <label className="form__label" htmlFor="name">
              Name
            </label>
            <input
              className="form__input-text  form__input-text-custom"
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              value={state.name}
            />
          </div>
          <div>
            <label className="form__label" htmlFor="thumb">
              Image URL
            </label>
            <input
              className="form__input-text form__input-text-custom"
              type="text"
              id="thumb"
              name="thumb"
              onChange={handleChange}
              value={state.thumb}
            />
          </div>

          <div>
            <label className="form__label" htmlFor="recipe">
              Recipe
            </label>
            <textarea
              rows="7"
              className="form__input-text form__input-text-custom"
              id="recipe"
              name="recipe"
              onChange={handleChange}
              value={state.recipe}
            />
          </div>
          <div>
            <label className="form__label" htmlFor="type">
              Type:
            </label>
            <select
              className="form__input-select"
              id="type"
              name="type"
              defaultValue="default"
              onChange={handleChange}
              value={state.type}
            >
              <option hidden value="default">
                Select an option...
              </option>
              {store.lists.types.map((e, index) => {
                return (
                  <option key={index} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label className="form__label" htmlFor="glass">
              Glass:
            </label>
            <select
              className="form__input-select"
              id="glass"
              name="glass"
              defaultValue="default"
              onChange={handleChange}
              value={state.glass}
            >
              <option hidden value="default">
                Select an option...
              </option>
              {store.lists.glasses.map((e, index) => {
                return (
                  <option key={index} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label className="form__label" htmlFor="alcoholic">
              Alcoholic:
            </label>
            <select
              className="form__input-select"
              id="alcoholic"
              name="alcoholic"
              defaultValue="default"
              onChange={handleChange}
              value={state.alcoholic}
            >
              <option disabled hidden value="default">
                Select an option...
              </option>
              {store.lists.alcoholic.map((e, index) => {
                return (
                  <option key={index} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="boxForm__sections-section">
          <div>
            <label className="form__label" htmlFor="ingredientes">
              Ingredients:
            </label>
            <select
              className="form__input-select"
              id="ingredientes"
              name="ingredientes"
              defaultValue="default"
              onChange={(evt) => {
                setIngredients([
                  ...ingredients,
                  { name: evt.target.value, amount: '' },
                ]);
              }}
            >
              <option hidden value="default">
                Select up to 3 options...
              </option>
              {store.lists.ingredients.sort().map((e, index) => {
                return (
                  <option key={index} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            {ingredients.map((e, index) => {
              if (index > 0) {
                return (
                  <div className="form__label-div" key={index}>
                    <label className="form__label-custom" htmlFor={e.name}>
                      {e.name}
                    </label>
                    <i
                      className="far fa-trash-alt"
                      data-testid="delete-ingredient"
                      onClick={() =>
                        setIngredients(
                          ingredients.filter(
                            (d, deleteIndex) => deleteIndex !== index
                          )
                        )
                      }
                    ></i>
                    <input
                      placeholder="Add amount"
                      type="text"
                      value={e.amount}
                      onChange={handleIngredientInput}
                      name={e.name}
                      className="form__input-text form__input-text-custom"
                      id={e.name}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>

      <button onClick={handleSubmit} className="add-button add-button-custom">
        Add
      </button>
    </div>
  );
};

export default FormCustom;
