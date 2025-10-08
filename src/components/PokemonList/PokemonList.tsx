import React, { useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Pokemon, useGetPokemons } from '../../hooks/useGetPokemons';
import { useNavigate } from 'react-router-dom';

export const PokemonList: React.FC = () => {
  const classes = useStyles();
  const { pokemons, loading, error } = useGetPokemons();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Filter pokemons based on search input (case insensitive)
  const filteredPokemons = useMemo(() => {
    const searchedPokemon = search.trim().toLowerCase();

    if (!searchedPokemon) return pokemons;

    return pokemons.filter(
      (pokemon: Pokemon) =>
        pokemon.name.toLowerCase().includes(searchedPokemon) ||
        pokemon.number.includes(searchedPokemon) ||
        pokemon.types.some((type: string) =>
          type.toLowerCase().includes(searchedPokemon)
        )
    );
  }, [pokemons, search]);

  const renderPokemons = (): React.ReactNode => {
    if (!filteredPokemons.length) {
      return <div className={classes.container}>No pokemons found</div>;
    }

    return filteredPokemons.map((pokemon: Pokemon) => (
      <div
        key={pokemon.id}
        className={classes.item}
        onClick={() => navigate(`/pokemon/${pokemon.id}`)}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${pokemon.name}`}
      >
        <img src={pokemon.image} alt={pokemon.name} className={classes.image} />
        <div className={classes.name}>{pokemon.name}</div>
        <div className={classes.number}>#{pokemon.number}</div>
        <div className={classes.types}>
          {pokemon.types.map((type) => (
            <span key={type} className={classes.type}>
              {type}
            </span>
          ))}
        </div>
      </div>
    ));
  };

  if (loading) {
    return <div className={classes.container}>Loading...</div>;
  }

  if (error) {
    return <div className={classes.container}>Error loading pokemons.</div>;
  }

  return (
    <div className={classes.container}>
      <input
        type="text"
        className={classes.search}
        placeholder="Search Pokémon by name, number or type..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search Pokémon"
      />

      <div className={classes.list}>
        {renderPokemons()}
      </div>
    </div>
  );
};

const useStyles = createUseStyles({
  container: {
    padding: 24,
  },
  search: {
    color: '#333',
    marginBottom: 24,
    padding: 8,
    fontSize: 16,
    width: '100%',
    maxWidth: 400,
    borderRadius: 4,
    border: '1px solid #ccc',
  },
  list: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 24,
  },
  item: {
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    padding: 16,
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-4px) scale(1.03)',
      boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
      border: '2px solid #ef5350',
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: 96,
    height: 96,
    marginBottom: 12,
    background: '#f2f2f2',
    borderRadius: '50%',
    objectFit: 'contain',
  },
  name: {
    fontWeight: 600,
    fontSize: 18,
    marginBottom: 4,
    color: '#222',
  },
  number: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  types: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  type: {
    background: '#ef5350',
    color: '#fff',
    borderRadius: 8,
    padding: '2px 10px',
    fontSize: 12,
    fontWeight: 500,
    marginBottom: 2,
  },
});
