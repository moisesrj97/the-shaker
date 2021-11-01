import './App.scss';
import { Route, Switch } from 'react-router';
import HomePage from './pages/homepage/HomePage';
import { Footer } from './components/footer/Footer';
import Details from './pages/details/Details';

function App() {
  return (
    <div className='App'>
      <div>Header</div>
      <main>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/details/:id'>
            <Details />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
