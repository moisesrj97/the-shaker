import logo from './logo.svg';
import './App.scss';
import { Route, Switch } from 'react-router';

function App() {
  return (
    <div className='App'>
      <div>Header</div>
      <main>
        <Switch>
          <Route exact path='/'></Route>
        </Switch>
      </main>
      <div>Footer</div>
    </div>
  );
}

export default App;
