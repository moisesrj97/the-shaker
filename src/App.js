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

function App() {
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
