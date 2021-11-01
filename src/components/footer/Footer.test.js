import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Footer } from "./Footer";

test("renders footer text", () => {
  render(
    <Router>
      <Footer />
    </Router>
  );

  const titleElement = screen.getByText(/Miguel, Moisés & Jorge/);

  expect(titleElement).toBeInTheDocument();
});
