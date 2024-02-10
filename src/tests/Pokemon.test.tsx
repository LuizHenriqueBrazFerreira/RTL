import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica a funcionalidade do componente Pokemon.tsx', () => {
  const pokeNameTest = 'pokemon-name';
  const pokeTypeTest = 'pokemon-type';
  const pokeWeightTest = 'pokemon-weight';
  test('Verifica se o componente é renderizado corretamente', async () => {
    renderWithRouter(<App />);

    expect(screen.getByTestId(pokeNameTest)).toHaveTextContent('Pikachu');
    expect(screen.getByTestId(pokeTypeTest)).toHaveTextContent('Electric');
    expect(screen.getByTestId(pokeWeightTest)).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonPicture = screen.getByRole('img') as HTMLImageElement;
    expect(pokemonPicture.alt).toBe('Pikachu sprite');
    expect(pokemonPicture.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');

    // Verifica se ao clicar no botão More details é levado ao caminho correto
    const detailsBtn = screen.getByRole('link', { name: 'More details' });
    expect(detailsBtn).toHaveAttribute('href', '/pokemon/25');
  });
  test('Verifica se ao clicar no botão de favoritar, o icone de favorito aparece', async () => {
    const { user } = renderWithRouter(<App />, { route: '/pokemon/25' });

    expect(await screen.findByText('Pikachu Details')).toBeInTheDocument();
    expect(await screen.findByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.')).toBeInTheDocument();

    const checkboxPokemon = await screen.findByRole('checkbox', { checked: false, name: 'Pokémon favoritado?' });
    expect(checkboxPokemon).toBeInTheDocument();

    await user.click(checkboxPokemon);

    const renderedImgs = screen.getAllByRole('img');

    expect(renderedImgs[0]).toHaveAttribute('src', '/star-icon.png');
    expect(renderedImgs[0]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
