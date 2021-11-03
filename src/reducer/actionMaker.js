import {
  LOGIN_USER,
  LOGOUT_USER,
  ADD_FAV,
  REMOVE_FAV,
  LOAD_LISTS,
  CREATE_CUSTOM,
  REMOVE_CUSTOM,
  UPDATE_CUSTOM,
} from './actionTypes';

export const loginUser = (response) => {
  return {
    type: LOGIN_USER,
    payload: response,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
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

/* --------------------------- */

export const createCustom = (response) => {
  return {
    type: CREATE_CUSTOM,
    payload: response,
  };
};

export const removeCustom = (response) => {
  return {
    type: REMOVE_CUSTOM,
    payload: response,
  };
};

export const updateCustom = (response) => {
  return {
    type: UPDATE_CUSTOM,
    payload: response,
  };
};
