import logo from './logo.svg';
import './App.scss';
import { Route, Switch } from 'react-router';

function App() {
  return (
    <div className='App'>
      <div>Header</div>
      <Switch>
        <Route exact path='/'></Route>
      </Switch>
      <div>Footer</div>
    </div>
  );
}

export default App;
