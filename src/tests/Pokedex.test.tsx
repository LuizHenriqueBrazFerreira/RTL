import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica a funcionalidade do componente Pokédex', async () => {
  const pokeNameTest = 'pokemon-name';
  const pokeTypeTest = 'pokemon-type';
  const nextBtnTest = 'Próximo Pokémon';
  test('Verifica a renderização inicial do componente', () => {
    renderWithRouter(<App />);
    const nextBtn = screen.getByRole('button', { name: nextBtnTest });

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Encountered Pokémon');

    expect(nextBtn).toBeInTheDocument();

    const firstPokemonName = screen.getByTestId(pokeNameTest);
    expect(firstPokemonName).toHaveTextContent('Pikachu');

    const firstPokemonType = screen.getByTestId(pokeTypeTest);
    expect(firstPokemonType).toHaveTextContent('Electric');
  });

  test('Verifica se ao clicar no botão "Próximo Pokémon" um novo pokémon é exibido', async () => {
    const { user } = renderWithRouter(<App />);
    const nextBtn = screen.getByRole('button', { name: nextBtnTest });
    await user.click(nextBtn);

    const newPokeName = await screen.findByTestId(pokeNameTest);
    expect(newPokeName).toHaveTextContent('Charmander');

    const newPokeType = await screen.findByTestId(pokeTypeTest);
    expect(newPokeType).toHaveTextContent('Fire');
  });

  test('Verifica se ao clicar no botão "Próximo Pokémon" quando exibir o último pokémon, irá exibir o primeiro pokémon novamente', async () => {
    const { user } = renderWithRouter(<App />);
    const nextBtn = screen.getByRole('button', { name: nextBtnTest });
    await user.click(nextBtn);
    await user.click(nextBtn);
    await user.click(nextBtn);
    await user.click(nextBtn);
    await user.click(nextBtn);
    await user.click(nextBtn);
    await user.click(nextBtn);
    await user.click(nextBtn);

    const lastPokemonName = await screen.findByTestId(pokeNameTest);
    expect(lastPokemonName).toHaveTextContent('Dragonair');

    const lastPokemonType = await screen.findByTestId(pokeTypeTest);
    expect(lastPokemonType).toHaveTextContent('Dragon');

    await user.click(nextBtn);

    const newPokeName = await screen.findByTestId(pokeNameTest);
    expect(newPokeName).toHaveTextContent('Pikachu');

    const newPokeType = await screen.findByTestId(pokeTypeTest);
    expect(newPokeType).toHaveTextContent('Electric');
  });
  test('Verifica se existe uma tabela de filtros de tipos', async () => {
    const { user } = renderWithRouter(<App />);

    expect(screen.getAllByTestId('pokemon-type-button')).toHaveLength(7);

    const dragonTypeBtn = screen.getByRole('button', { name: 'Dragon' });
    await user.click(dragonTypeBtn);

    expect(await screen.findByTestId(pokeNameTest)).toHaveTextContent('Dragonair');
    expect(await screen.findByTestId(pokeTypeTest)).toHaveTextContent('Dragon');

    await user.click(screen.getByRole('button', { name: 'All' }));

    expect(await screen.findByTestId(pokeNameTest)).toHaveTextContent('Pikachu');
    expect(await screen.findByTestId(pokeTypeTest)).toHaveTextContent('Electric');
  });
});
