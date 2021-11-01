import './App.scss';
import { Route, Switch } from 'react-router';
import HomePage from './pages/homepage/HomePage';

function App() {
  return (
    <div className='App'>
      <div>Header</div>
      <main>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
        </Switch>
      </main>
      <div>Footer</div>
    </div>
  );
}

export default App;
