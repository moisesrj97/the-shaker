import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Given the component Footer...', () => {
  describe('When component is instantiated...', () => {
    test('renders footer text', () => {
      render(<Footer />);

      const titleElement = screen.getByText(/Miguel, Moisés & Jorge/);

      expect(titleElement).toBeInTheDocument();
    });
  });
});
