import { useAuth0 } from '@auth0/auth0-react';
import React, { useReducer, createContext, useEffect } from 'react';
import userReducer from '../reducer/userReducer';
import CocktailsApi from '../services/CocktailsAPI';
import UsersAPI from '../services/UsersAPI';

const DataContext = createContext();

const DataContextProvider = (props) => {
  const { user } = useAuth0();
  const [store, dispatch] = useReducer(userReducer, {
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
    lists: {
      ingredients: [''],
      types: [''],
      glasses: [''],
      alcoholic: [''],
    },
  });

  useEffect(() => {
    CocktailsApi.getAllLists().then((response) =>
      dispatch({ type: 'LOAD_LISTS', payload: response })
    );
  }, []);

  useEffect(() => {
    if (user) {
      UsersAPI.getUserData(user.email).then((response) =>
        dispatch({ type: 'LOGIN_USER', payload: response })
      );
    } else {
      dispatch({ type: 'LOGOUT_USER' });
    }
  }, [user]);

  return (
    <DataContext.Provider value={{ store, dispatch }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
