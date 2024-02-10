import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Verifica se o componente App.tsx é renderizado corretamente', () => {
  renderWithRouter(<App />);

  const homeButton = screen.getByRole('link', { name: 'Home' });
  expect(homeButton).toBeInTheDocument();

  const aboutButton = screen.getByRole('link', { name: 'About' });
  expect(aboutButton).toBeInTheDocument();

  const favoriteButton = screen.getByRole('link', { name: 'Favorite Pokémon' });
  expect(favoriteButton).toBeInTheDocument();
});
