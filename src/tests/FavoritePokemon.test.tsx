import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Verifica a funcionalidade do componente Favorite Pokemon', () => {
  test('Verifica se o componente Favorite Pokemon é renderizado corretamente', async () => {
    const { user } = renderWithRouter(<App />);
    const pokeText = 'Favorite Pokémon';

    await user.click(screen.getByRole('link', { name: pokeText }));

    const titleFavorite = screen.getByRole('heading', { level: 2 });
    expect(titleFavorite).toHaveTextContent(pokeText);

    const notFoundPoke = screen.getByText('No favorite Pokémon found');
    expect(notFoundPoke).toBeInTheDocument();
  });
  test('Verifica se ao selecionar um pokémon como favorito, ele é renderizado', async () => {
    const { user } = renderWithRouter(<App />, { route: '/pokemon/4' });

    const favoriteCharmander = await user.click(screen.getByRole('checkbox', { name: 'Pokémon favoritado?' }));

    await user.click(screen.getByRole('link', { name: 'Favorite Pokémon' }));

    const pokeName = screen.getByText('Charmander');
    expect(pokeName).toBeInTheDocument();

    const pokeType = screen.getByText('Fire');
    expect(pokeType).toBeInTheDocument();

    const pokeWeight = screen.getByText('Average weight: 8.5 kg');
    expect(pokeWeight).toBeInTheDocument();
  });
});
