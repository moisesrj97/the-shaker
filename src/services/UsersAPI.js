import axios from 'axios';
import { v4 as uuid } from 'uuid';

const baseURL = 'https://dry-lake-02226.herokuapp.com/';
export default class UsersAPI {
  static async getUserData(id) {
    try {
      const response = await axios.get(baseURL + 'users/' + id);
      return response.data;
    } catch (e) {
      const response = await axios.post(baseURL + 'users/', {
        id,
        fav: [
          {
            id: '',
            name: '',
            thumb: '',
            apiId: '',
          },
        ],
        custom: [
          {
            name: '',
            thumb: '',
            recipe: '',
            type: '',
            glass: '',
            alcoholic: '',
            ingredientes: [''],
            ingredientesAmount: [''],
            id: '',
          },
        ],
      });
      return response.data;
    }
  }

  static async addFavorite(id, newFavorite) {
    const { data } = await axios.get(baseURL + 'users/' + id);
    const response = await axios.patch(baseURL + 'users/' + id, {
      ...data,
      fav: [...data.fav, { ...newFavorite, id: uuid() }],
    });
    return response.data.fav.find((e) => e.apiId === newFavorite.apiId);
  }

  static async removeFavorite(id, favoriteId) {
    const { data } = await axios.get(baseURL + 'users/' + id);
    const response = await axios.patch(baseURL + 'users/' + id, {
      ...data,
      fav: data.fav.filter((e) => e.id !== favoriteId),
    });
    return response.data;
  }
  /* ----------------------------------------------- */

  static async createCustom(id, newCustom) {
    const { data } = await axios.get(baseURL + 'users/' + id);
    const response = await axios.patch(baseURL + 'users/' + id, {
      ...data,
      custom: [...data.custom, { ...newCustom, id: uuid() }],
    });
    return response.data.custom.find((e) => e.name === newCustom.name);
  }

  static async updateCustom(id, customId, editCustom) {
    const { data } = await axios.get(baseURL + 'users/' + id);
    const response = await axios.patch(baseURL + 'users/' + id, {
      ...data,
      custom: data.custom.map((e) => {
        if (e.id === customId) {
          return { ...editCustom };
        } else {
          return { ...e };
        }
      }),
    });
    return response.data.custom.find((e) => e.id === customId);
  }

  static async removeCustom(id, customId) {
    const { data } = await axios.get(baseURL + 'users/' + id);
    const response = await axios.patch(baseURL + 'users/' + id, {
      ...data,
      custom: data.custom.filter((e) => e.id !== customId),
    });
    return response.data;
  }
}
