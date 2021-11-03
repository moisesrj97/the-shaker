import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { DataContext } from '../../context/DataContext';
import { createCustom } from '../../reducer/actionMaker';
import UsersAPI from '../../services/UsersAPI';

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
    <>
      <h2>Create Cocktail</h2>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="thumb">Image URL</label>
        <input type="text" id="thumb" name="thumb" onChange={handleChange} />
      </div>

      <div>
        <label htmlFor="recipe">Recipe</label>
        <input type="text" id="recipe" name="recipe" onChange={handleChange} />
      </div>
      <div>
        <label className="" htmlFor="type">
          Type:
        </label>
        <select
          className=""
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
        <label className="" htmlFor="glass">
          Glass:
        </label>
        <select
          className=""
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
        <label className="" htmlFor="alcoholic">
          Alcoholic:
        </label>
        <select
          className=""
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
        <label className="" htmlFor="ingredientes">
          Ingredients:
        </label>
        <select
          className=""
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
              <div key={index}>
                <label>{e.name}</label>
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
                  type="text"
                  value={e.amount}
                  onChange={handleIngredientInput}
                  name={e.name}
                />
              </div>
            );
          }
        })}
      </div>
      <button onClick={handleSubmit} className="add-button">
        Add
      </button>
    </>
  );
};

export default FormCustom;
