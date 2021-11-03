import React, { useState } from 'react';

const FormCustom = () => {
  const [state, setstate] = useState({
    name: '',
    thumb: '',
    recipe: '',
    type: '',
    glass: '',
    alcoholic: '',
    ingredientes: [''],
    ingredientesAmount: [''],
  });
  return (
    <>
      <h2>Create Cocktail</h2>
      <form className="form">
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="nme" />
        </div>
        <div>
          <label htmlFor="thumb">Image URL</label>
          <input type="text" id="thumb" name="thumb" />
        </div>

        <div>
          <label htmlFor="recipe">Recipe</label>
          <input type="text" id="recipe" name="recipe" />
        </div>
        <div>
          <label className="" htmlFor="type">
            Type:
          </label>
          <select className="" id="type" name="type"></select>
        </div>
        <div>
          <label className="" htmlFor="glass">
            Glass:
          </label>
          <select className="" id="glass" name="glass"></select>
        </div>
        <div>
          <label className="" htmlFor="alcoholic">
            Alcoholic:
          </label>
          <select className="" id="alcoholic" name="alcoholic"></select>
        </div>
        <div>
          <label className="" htmlFor="ingredientes">
            Alcoholic:
          </label>
          <select className="" id="ingredientes" name="ingredientes"></select>
        </div>
      </form>
    </>
  );
};

export default FormCustom;
