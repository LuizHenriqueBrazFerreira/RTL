import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('Verifica a renderização do componente NotFount.tsx', () => {
  renderWithRouter(<NotFound />);

  const notFoundText = screen.getByRole('heading', { level: 2 });
  expect(notFoundText).toHaveTextContent('Page requested not found');

  const clefairyIMG = screen.getByAltText("Clefairy pushing buttons randomly with text I have no idea what i'm doing");
  expect(clefairyIMG).toBeInTheDocument();
});
