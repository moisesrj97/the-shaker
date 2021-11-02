import { useAuth0 } from '@auth0/auth0-react';
import React, { useReducer, createContext, useEffect } from 'react';
import { loadList, loginUser, logoutUser } from '../reducer/actionMaker';
import userReducer from '../reducer/userReducer';
import CocktailsApi from '../services/CocktailsAPI';
import UsersAPI from '../services/UsersAPI';

export const DataContext = createContext();

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
    CocktailsApi.getAllLists().then((response) => dispatch(loadList(response)));
  }, []);

  useEffect(() => {
    if (user) {
      UsersAPI.getUserData(user.email).then((response) =>
        dispatch(loginUser(response))
      );
    } else {
      dispatch(logoutUser());
    }
  }, [user]);

  return (
    <DataContext.Provider value={{ store, dispatch }}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
