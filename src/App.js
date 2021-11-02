import './App.scss';
import NavBar from './components/navbar/NavBar';
import { Route, Switch } from 'react-router';
import HomePage from './pages/homepage/HomePage';
import Footer from './components/footer/Footer';
import Details from './pages/details/Details';
import SearchPage from './pages/search/SearchPage';
import Favorites from './pages/favorites/Favorites';

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
          <Route exact path="/search/">
            <SearchPage />
          </Route>
          <Route exact path="/favorites">
            <Favorites />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
