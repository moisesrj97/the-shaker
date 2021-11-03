import {
  LOGIN_USER,
  LOGOUT_USER,
  ADD_FAV,
  LOAD_LISTS,
  REMOVE_FAV,
  CREATE_CUSTOM,
  REMOVE_CUSTOM,
  UPDATE_CUSTOM,
} from './actionTypes';

const userReducer = (state, action) => {
  console.log(action);
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
    case CREATE_CUSTOM:
      return {
        ...state,
        user: { ...state.user, custom: [...state.user.custom, action.payload] },
      };
    case REMOVE_CUSTOM:
      return {
        ...state,
        user: {
          ...state.user.custom.filter((e) => e.id !== action.payload),
        },
      };
    case UPDATE_CUSTOM:
      return {
        ...state,
        user: {
          ...state.user,
          custom: state.user.custom.map((e) => {
            if (e.id === action.payload.id) {
              return { ...action.payload.updatedCustom };
            } else {
              return { ...e };
            }
          }),
        },
      };

    default:
      return state;
  }
};

export default userReducer;
