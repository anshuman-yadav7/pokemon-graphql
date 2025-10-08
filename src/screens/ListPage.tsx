import React from 'react';
import { createUseStyles } from 'react-jss';
import { PokemonList } from '../components';
import PokemonDetailsDialog from 'src/components/PokemonList/PokemonDetailsDialog';
import { useNavigate, useParams } from 'react-router-dom';

export const ListPage: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <PokemonList />

      {id && (
        <PokemonDetailsDialog
          open={!!id}
          pokemonId={id}
          onClose={() => navigate('/pokemon')}
        />
      )}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      height: '100%',
    },
  },
  { name: 'ListPage' }
);
