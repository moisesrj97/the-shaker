import React, { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';

import './SearchForm.scss';

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

  const handleDropdowns = (evt) => {
    const allInputs = [
      ...document.querySelectorAll('input'),
      ...document.querySelectorAll('select'),
    ];

    allInputs.forEach((e) => {
      if (e.name !== evt.target.htmlFor) {
        e.classList.add('hidden');
      } else {
        e.classList.remove('hidden');
      }
    });
  };

  return (
    <div className="form">
      <h3>Searching by: {state.query.join(', ')}</h3>
      <label className="form__label" htmlFor="byName" onClick={handleDropdowns}>
        By name:
      </label>
      <input
        onChange={handleChange}
        className="form__input-text hidden"
        type="text"
        id="byName"
        name="byName"
      />
      <label
        className="form__label"
        htmlFor="byLetter"
        onClick={handleDropdowns}
      >
        By Letter:
      </label>
      <select
        onChange={handleChange}
        className="form__input-select hidden"
        id="byLetter"
        name="byLetter"
        defaultValue={'default'}
      >
        <option hidden value="default">
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
      <label
        className="form__label"
        htmlFor="byAlcoholic"
        onClick={handleDropdowns}
      >
        By Alcoholic:
      </label>
      <select
        onChange={handleChange}
        className="form__input-select hidden"
        id="byAlcoholic"
        name="byAlcoholic"
        defaultValue="default"
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
      <label className="form__label" htmlFor="byType" onClick={handleDropdowns}>
        By Type:
      </label>
      <select
        onChange={handleChange}
        className="form__input-select hidden"
        id="byType"
        name="byType"
        defaultValue={'default'}
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
      <label
        className="form__label"
        htmlFor="byGlass"
        onClick={handleDropdowns}
      >
        By Glass:
      </label>
      <select
        onChange={handleChange}
        className="form__input-select hidden"
        id="byGlass"
        name="byGlass"
        defaultValue={'default'}
      >
        <option value="default" hidden disabled>
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
      <label
        className="form__label"
        htmlFor="byIngredient"
        onClick={handleDropdowns}
      >
        By Ingredient/s:
      </label>
      <select
        className="form__input-select hidden"
        id="byIngredient"
        name="byIngredient"
        onChange={handleChange}
        defaultValue={'default'}
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
      <ul className="form__ingredients">
        {state.type === 'byIngredient' &&
          state.query.map((e, index) => {
            return (
              <li key={index}>
                {e}
                <i
                  className="far fa-trash-alt"
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
      <button onClick={handleSearch} className="form__button">
        Shake it!
      </button>
    </div>
  );
};

export default SearchForm;
