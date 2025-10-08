import { useQuery } from "@apollo/client/react";
import gql from "graphql-tag";

export type Pokemon = {
  id: string;
  name: string;
  number: string;
  image: string;
  types: string[];
  classification: string;
  weight: { minimum: string; maximum: string };
  height: { minimum: string; maximum: string };
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
};

export const GET_POKEMON_DETAILS = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export function useGetPokemonDetails(id?: string, name?: string) {
  const { data, loading, error } = useQuery<{ pokemon: Pokemon }>(GET_POKEMON_DETAILS, {
    variables: { id, name },
    skip: !id && !name,
  });

  return {
    pokemon: data?.pokemon,
    loading,
    error,
  };
}
