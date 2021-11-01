import logo from "./logo.svg";
import "./App.scss";
import { Route, Switch } from "react-router";
import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Switch>
          <Route exact path="/"></Route>
        </Switch>
      </main>
      <div>Footer</div>
    </div>
  );
}

export default App;
