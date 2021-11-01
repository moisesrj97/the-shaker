import { render, screen } from "@testing-library/react";
import App from "../../App";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

test("renders footer text", () => {
  const history = createMemoryHistory();
  history.push("/");

  render(
    <Router history={history}>
      <App />
    </Router>
  );

  const titleElement = screen.getByText(/Miguel, Moisés & Jorge/);

  expect(titleElement).toBeInTheDocument();
});
