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

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/details/:id">
            <Details />
          </Route>
          <Route exact path="/details-custom/:id">
            <DetailsCustom />
          </Route>
          <Route exact path="/search/">
            <SearchPage />
          </Route>
          <Route exact path="/favorites">
            <Favorites />
          </Route>
          <Route exact path="/custom">
            <CustomPage />
          </Route>
          <Route exact path="/create-custom">
            <FormCustom />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
