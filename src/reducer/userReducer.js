import {
  LOGIN_USER,
  LOGOUT_USER,
  ADD_FAV,
  LOAD_LISTS,
  REMOVE_FAV,
} from './actionTypes';

const userReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, user: { ...action.payload } };
    case LOGOUT_USER:
      return {
        ...state,
        user: {
          id: '',
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
        },
      };
    case ADD_FAV:
      return {
        ...state,
        user: { ...state.user, fav: [...state.user.fav, action.payload] },
      };
    case REMOVE_FAV:
      return {
        ...state,
        user: {
          ...state.user,
          fav: state.user.fav.filter((e) => e.id !== action.payload),
        },
      };
    case LOAD_LISTS:
      return {
        ...state,
        lists: {
          types: action.payload[0],
          glasses: action.payload[1],
          alcoholic: action.payload[2],
          ingredients: action.payload[3],
        },
      };
    default:
      throw new Error('Unknown action type');
  }
};

export default userReducer;
