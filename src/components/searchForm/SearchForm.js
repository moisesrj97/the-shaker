import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';

const SearchForm = () => {
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));

  const [ingredients, setIngredients] = useState([]);

  const { store } = useContext(DataContext);

  return (
    <div>
      <div>
        <label className="form__label" htmlFor="byName">
          By name:
        </label>
        <input
          className="form__input-text"
          type="text"
          id="byName"
          name="byName"
        />
      </div>
      <div>
        <label className="form__label" htmlFor="byLetter">
          By Letter:
        </label>
        <select className="form__input-select" id="byLetter" name="byLetter">
          <option selected disabled>
            Select an option...
          </option>
          {alphabet.map((e, index) => {
            return (
              <option key={index} value={e}>
                {e}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label className="form__label" htmlFor="byAlcoholic">
          By Alcoholic:
        </label>
        <select
          className="form__input-select"
          id="byAlcoholic"
          name="byAlcoholic"
        >
          <option selected disabled>
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
        <label className="form__label" htmlFor="byType">
          By Type:
        </label>
        <select className="form__input-select" id="byType" name="byType">
          <option selected disabled>
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
        <label className="form__label" htmlFor="byGlass">
          By Glass:
        </label>
        <select className="form__input-select" id="byGlass" name="byGlass">
          <option selected disabled>
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
        <label className="form__label" htmlFor="byIngredient">
          By Ingredient/s:
        </label>
        <select
          className="form__input-select"
          id="byIngredient"
          name="byIngredient"
          onChange={(evt) => setIngredients([...ingredients, evt.target.value])}
        >
          <option selected disabled>
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
        <ul>
          {ingredients.map((e, index) => {
            return (
              <li key={index}>
                {e}{' '}
                <i
                  class="far fa-trash-alt"
                  onClick={() =>
                    setIngredients(
                      ingredients.filter((i, iIndex) => iIndex !== index)
                    )
                  }
                ></i>
              </li>
            );
          })}
        </ul>
      </div>
      <button>Shake it!</button>
    </div>
  );
};

export default SearchForm;
