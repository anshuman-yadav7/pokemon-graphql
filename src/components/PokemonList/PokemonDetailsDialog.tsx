import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
  useGetPokemonDetails,
  Pokemon,
} from '../../hooks/useGetPokemonDetails';
import { createUseStyles } from 'react-jss';

type Props = {
  open: boolean;
  pokemonId: string;
  onClose: () => void;
};

const PokemonDetailsDialog: React.FC<Props> = ({
  open,
  pokemonId,
  onClose,
}) => {
  const classes = useStyles();
  const { pokemon, loading, error } = useGetPokemonDetails(pokemonId);

  const renderPokemonDetails = (): React.ReactNode => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error loading details.</div>;
    }

    return (
      pokemon && (
        <div>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className={classes.image}
          />
          <div className={classes.section}>
            <span className={classes.label}>Name:</span> {pokemon.name}
          </div>
          <div className={classes.section}>
            <span className={classes.label}>Number:</span> #{pokemon.number}
          </div>
          <div className={classes.types}>
            {pokemon.types.map((type: string) => (
              <span key={type} className={classes.type}>
                {type}
              </span>
            ))}
          </div>
          <div className={classes.section}>
            <span className={classes.label}>Classification:</span>{' '}
            {pokemon.classification}
          </div>
          <div className={classes.section}>
            <span className={classes.label}>Height:</span>{' '}
            {pokemon.height.minimum} - {pokemon.height.maximum}
          </div>
          <div className={classes.section}>
            <span className={classes.label}>Weight:</span>{' '}
            {pokemon.weight.minimum} - {pokemon.weight.maximum}
          </div>
          <div className={classes.section}>
            <span className={classes.label}>Max CP:</span> {pokemon.maxCP}
          </div>
          <div className={classes.section}>
            <span className={classes.label}>Max HP:</span> {pokemon.maxHP}
          </div>
          <div className={classes.section}>
            <span className={classes.label}>Resistant:</span>{' '}
            {pokemon.resistant.join(', ')}
          </div>
          <div className={classes.section}>
            <span className={classes.label}>Weaknesses:</span>{' '}
            {pokemon.weaknesses.join(', ')}
          </div>
          <div className={classes.section}>
            <span className={classes.label}>Flee Rate:</span> {pokemon.fleeRate}
          </div>
        </div>
      )
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <div className={classes.titleRow}>
          <span>Pokémon Details</span>
          <IconButton aria-label="close" onClick={onClose} tabIndex={0}>
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>

      <DialogContent dividers>{renderPokemonDetails()}</DialogContent>
    </Dialog>
  );
};

const useStyles = createUseStyles({
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: 120,
    height: 120,
    display: 'block',
    margin: '0 auto 16px',
    background: '#f2f2f2',
    borderRadius: '50%',
    objectFit: 'contain',
  },
  types: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 8,
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
  section: {
    color: '#555',
    marginBottom: 12,
  },
  label: {
    color: '#333',
    fontWeight: 600,
    marginRight: 4,
  },
  close: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
});

export default PokemonDetailsDialog;
