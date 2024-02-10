import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('Verifica se o componente About.tsx é renderizado corretamente', () => {
  renderWithRouter(<About />);

  // Verify if tag h2 appears in the document
  const pokeText = screen.getByRole('heading', { level: 2 });
  expect(pokeText).toHaveTextContent('About Pokédex');

  // Verify if About component has 2 paragraph
  const firstParagraph = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon.');
  const secondParagraph = screen.getByText('One can filter Pokémon by type, and see more details for each one of them.');

  expect(firstParagraph).toBeInTheDocument();
  expect(secondParagraph).toBeInTheDocument();

  const pokeIMG = screen.getByRole('img') as HTMLImageElement;

  expect(pokeIMG.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
