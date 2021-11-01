import "./App.scss";
import { Route, Switch } from "react-router";
import HomePage from "./pages/homepage/HomePage";
import { Footer } from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <div>Header</div>
      <main>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
