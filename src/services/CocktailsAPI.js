import axios from 'axios';

const baseURL = `https://www.thecocktaildb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/`;

export default class CocktailsApi {
  //Search cocktail methods
  static async searchByCocktailName(name) {
    const response = await axios.get(baseURL + 'search.php?s=' + name);
    return response.data;
  }

  static async searchByCocktailId(id) {
    const response = await axios.get(baseURL + 'lookup.php?i=' + id);
    return response.data;
  }

  static async searchCocktailByFirstLetter(letter) {
    const response = await axios.get(baseURL + 'search.php?f=' + letter);
    return response.data;
  }

  static async searchCocktailByIngredient(ingredient) {
    const response = await axios.get(baseURL + 'filter.php?i=' + ingredient);
    return response.data;
  }

  static async searchCocktailByAlcoholic(alcoholic) {
    const response = await axios.get(baseURL + 'filter.php?a=' + alcoholic);
    return response.data;
  }

  static async searchCocktailByDrinkType(drinkType) {
    const response = await axios.get(baseURL + 'filter.php?c=' + drinkType);
    return response.data;
  }

  static async searchCocktailByGlassType(glassType) {
    const response = await axios.get(baseURL + 'filter.php?g=' + glassType);
    return response.data;
  }

  static async searchCocktailByMultipleIngredients(ingredientsArr) {
    const ingredientsStr = ingredientsArr.join();
    const response = await axios.get(
      baseURL + 'filter.php?i=' + ingredientsStr
    );
    return response.data;
  }

  static async searchRandomCocktail() {
    const response = await axios.get(baseURL + 'random.php');
    return response.data;
  }
  //Search ingredient methods
  static async searchIngredientByName(name) {
    const response = await axios.get(baseURL + 'search.php?i=' + name);
    return response.data;
  }

  static async searchIngredientById(id) {
    const response = await axios.get(baseURL + 'lookup.php?iid=' + id);
    return response.data;
  }
  //Search lists methods
  static async getIngredientsList() {
    const response = await axios.get(baseURL + 'list.php?i=list');
    return response.data.drinks.map((e) => e.strIngredient1);
  }

  static async getGlassList() {
    const response = await axios.get(baseURL + 'list.php?g=list');
    return response.data.drinks.map((e) => e.strGlass);
  }

  static async getTypeList() {
    const response = await axios.get(baseURL + 'list.php?c=list');
    return response.data.drinks.map((e) => e.strCategory);
  }

  static async getAlcoholicList() {
    const response = await axios.get(baseURL + 'list.php?a=list');
    return response.data.drinks.map((e) => e.strAlcoholic);
  }

  static async getAllLists() {
    const drinkTypes = await this.getTypeList();
    const glassTypes = await this.getGlassList();
    const alcoholicTypes = await this.getAlcoholicList();
    const ingredients = await this.getIngredientsList();
    return [drinkTypes, glassTypes, alcoholicTypes, ingredients];
  }
}
