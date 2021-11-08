import { useContext, useReducer } from 'react';
import { DataContext } from '../context/DataContext';
import userReducer from '../reducer/userReducer';

export function useDataContext() {
  const { store, dispatch } = useContext(DataContext);
}
