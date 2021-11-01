import { render, screen } from "@testing-library/react";
import App from "../../App";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

test("renders navbar test", () => {
  const history = createMemoryHistory();
  history.push("/");

  render(
    <Router history={history}>
      <App />
    </Router>
  );

  expect(screen.getByText("Cocktails")).toBeInTheDocument();
  expect(screen.getByText(/Favorites/i)).toBeInTheDocument();
  expect(screen.getByText(/My/i)).toBeInTheDocument();
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});
