import './App.scss';
import NavBar from './components/navbar/NavBar';
import { Route, Switch } from 'react-router';
import HomePage from './pages/homepage/HomePage';
import Footer from './components/footer/Footer';
import Details from './pages/details/Details';
import SearchPage from './pages/search/SearchPage';
import Favorites from './pages/favorites/Favorites';
import CustomPage from './pages/customPage/CustomPage';
import FormCustom from './pages/formCustom/formCustom';
import DetailsCustom from './pages/detailsCustom/DetailsCustom';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import { useContext, useEffect } from 'react';
import CocktailsApi from './services/CocktailsAPI';
import { useAuth0 } from '@auth0/auth0-react';
import { loadList, loginUser, logoutUser } from './reducer/actionMaker';
import UsersAPI from './services/UsersAPI';
import { DataContext } from './context/DataContext';

function App() {
  const { user } = useAuth0();
  const { dispatch } = useContext(DataContext);

  useEffect(() => {
    console.log('Loading lists');
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
    <div className="App">
      <NavBar />
      <main>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/details/:id">
            <Details />
          </Route>
          <ProtectedRoute
            path="/details-custom/:id"
            component={DetailsCustom}
          />
          <Route path="/search/">
            <SearchPage />
          </Route>
          <ProtectedRoute path="/favorites" component={Favorites} />
          <ProtectedRoute path="/custom" component={CustomPage} />
          <ProtectedRoute path="/create-custom" component={FormCustom} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
