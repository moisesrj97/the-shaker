import axios from 'axios';
import { v4 as uuid } from 'uuid';

const baseURL = 'http://localhost:3000/';
export default class UsersAPI {
  static async getUserData(id) {
    const response = await axios.get(baseURL + 'users/' + id);
    return response.data;
  }

  static async addFavorite(id, newFavorite) {
    const { data } = await axios.get(baseURL + 'users/' + id);
    const response = await axios.patch(baseURL + 'users/' + id, {
      ...data,
      fav: [...data.fav, { ...newFavorite, id: uuid() }],
    });
    return response.data;
  }

  static async removeFavorite(id, favoriteId) {
    const { data } = await axios.get(baseURL + 'users/' + id);
    const response = await axios.patch(baseURL + 'users/' + id, {
      ...data,
      fav: data.fav.filter((e) => e.id !== favoriteId),
    });
    return response.data;
  }
}
