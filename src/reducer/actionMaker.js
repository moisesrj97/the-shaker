import {
  LOGIN_USER,
  LOGOUT_USER,
  ADD_FAV,
  REMOVE_FAV,
  LOAD_LISTS,
} from './actionTypes';

export const loginUser = (response) => {
  return {
    type: LOGIN_USER,
    payload: response,
  };
};

export const logoutUser = (response) => {
  return {
    type: LOGOUT_USER,
    payload: response,
  };
};

export const addFav = (response) => {
  return {
    type: ADD_FAV,
    payload: response,
  };
};

export const removeFav = (response) => {
  return {
    type: REMOVE_FAV,
    payload: response,
  };
};

export const loadList = (response) => {
  return {
    type: LOAD_LISTS,
    payload: response,
  };
};
