import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { DataContext } from '../../context/DataContext';
import { createCustom } from '../../reducer/actionMaker';
import UsersAPI from '../../services/UsersAPI';
import './formCustom.scss';

const FormCustom = () => {
  const [state, setState] = useState({
    name: '',
    thumb: '',
    recipe: '',
    type: '',
    glass: '',
    alcoholic: '',
  });

  const history = useHistory();

  const [ingredients, setIngredients] = useState([{ name: '', amount: '' }]);

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
      ingredientes: ingredients.map((e) => e.name),
      ingredientesAmount: ingredients.map((e) => e.amount),
    };

    UsersAPI.createCustom(store.user.id, newCocktail).then((response) => {
      dispatch(createCustom(response));
      history.push('/custom');
    });
  };

  return (
    <div className="boxForm">
      <h2 className="favorites">Create Cocktail</h2>
      <div className="">
        <label className="form__label" htmlFor="name">
          Name
        </label>
        <input
          className="form__input-text"
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="form__label" htmlFor="thumb">
          Image URL
        </label>
        <input
          className="form__input-text"
          type="text"
          id="thumb"
          name="thumb"
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="form__label" htmlFor="recipe">
          Recipe
        </label>
        <input
          className="form__input-text"
          type="text"
          id="recipe"
          name="recipe"
          onChange={handleChange}
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
                <label className="form__label-custom">{e.name}</label>
                <i
                  className="far fa-trash-alt"
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
                  className="form__input-text"
                />
              </div>
            );
          }
        })}
      </div>
      <button onClick={handleSubmit} className="add-button">
        Add
      </button>
    </div>
  );
};

export default FormCustom;
