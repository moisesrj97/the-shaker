import './App.scss';
import { Route, Switch } from 'react-router';
import HomePage from './pages/homepage/HomePage';
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
      <div>Footer</div>
    </div>
  );
}

export default App;
