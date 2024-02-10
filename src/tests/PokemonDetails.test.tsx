import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica a funcionalidade do componente PokemonDetails.tsx', () => {
  const details = 'More details';
  test('Verifica se é exibido corretamente ao clicar nos detalhes de um pokemon', async () => {
    const { user } = renderWithRouter(<App />);

    const detailsBtn = screen.getByRole('link', { name: details });
    expect(detailsBtn).toBeInTheDocument();

    await user.click(detailsBtn);

    expect(await screen.findByText('Pikachu Details')).toBeInTheDocument();
    expect(detailsBtn).not.toBeInTheDocument();

    const headings = await screen.findAllByRole('heading', { level: 2 });
    expect(headings[1]).toHaveTextContent('Summary');

    expect(await screen.findByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.')).toBeInTheDocument();
  });
  test('Verifica se exibido os mapas de localizações do pokemon', async () => {
    const { user } = renderWithRouter(<App />);

    const detailsBtn = screen.getByRole('link', { name: details });
    expect(detailsBtn).toBeInTheDocument();

    await user.click(detailsBtn);

    expect(await screen.findByText('Pikachu Details')).toBeInTheDocument();
    expect(detailsBtn).not.toBeInTheDocument();

    const headings = await screen.findAllByRole('heading', { level: 2 });
    expect(headings[2]).toHaveTextContent('Game Locations of Pikachu');

    const locationImgs = await screen.findAllByRole('img');
    expect(locationImgs[2]).toHaveAttribute('alt', 'Pikachu location');
    expect(locationImgs[2]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  test('Verifica se é possível favoritar por meio da pagina de detalhes', async () => {
    const { user } = renderWithRouter(<App />);

    const detailsBtn = screen.getByRole('link', { name: details });
    expect(detailsBtn).toBeInTheDocument();

    await user.click(detailsBtn);

    const favoriteCheckbox = await screen.findByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favoriteCheckbox).toBeInTheDocument();

    await user.click(favoriteCheckbox);
    expect(favoriteCheckbox).toBeChecked();

    await user.click(favoriteCheckbox);
    expect(favoriteCheckbox).not.toBeChecked();
  });
});
