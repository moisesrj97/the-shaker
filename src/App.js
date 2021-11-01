import logo from "./logo.svg";
import "./App.scss";
import { Route, Switch } from "react-router";
import { Footer } from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <div>Header</div>
      <main>
        <Switch>
          <Route exact path="/"></Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
