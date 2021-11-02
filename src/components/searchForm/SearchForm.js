import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';

const SearchForm = (props) => {
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));

  const [state, setState] = useState({ type: '', query: [''] });

  const { store } = useContext(DataContext);

  const handleChange = (evt) => {
    if (state.type === 'byIngredient' && evt.target.name === 'byIngredient') {
      setState({
        type: evt.target.name,
        query: [...state.query, evt.target.value],
      });
    } else {
      setState({ type: evt.target.name, query: [evt.target.value] });
    }
  };

  const handleSearch = () => props.searchCocktails(state.type, state.query);

  return (
    <div>
      <div>
        <label className="form__label" htmlFor="byName">
          By name:
        </label>
        <input
          onChange={handleChange}
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
        <select
          onChange={handleChange}
          className="form__input-select"
          id="byLetter"
          name="byLetter"
        >
          <option defaultValue disabled>
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
          onChange={handleChange}
          className="form__input-select"
          id="byAlcoholic"
          name="byAlcoholic"
        >
          <option disabled>Select an option...</option>
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
        <select
          onChange={handleChange}
          className="form__input-select"
          id="byType"
          name="byType"
        >
          <option defaultValue disabled>
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
        <select
          onChange={handleChange}
          className="form__input-select"
          id="byGlass"
          name="byGlass"
        >
          <option defaultValue disabled>
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
          onChange={handleChange}
          className="form__input-select"
          id="byIngredient"
          name="byIngredient"
          onChange={handleChange}
        >
          <option defaultValue disabled>
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
          {state.type === 'byIngredient' &&
            state.query.map((e, index) => {
              return (
                <li key={index}>
                  {e}
                  <i
                    class="far fa-trash-alt"
                    onClick={() =>
                      setState({
                        ...state,
                        query: state.query.filter(
                          (i, iIndex) => iIndex !== index
                        ),
                      })
                    }
                  ></i>
                </li>
              );
            })}
        </ul>
      </div>
      <button onClick={handleSearch}>Shake it!</button>
    </div>
  );
};

export default SearchForm;
