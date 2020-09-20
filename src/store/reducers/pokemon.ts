/* eslint-disable camelcase */
import {
  GET_INFO_POKEMON_SUCCESS,
  POKELIST_ERROR,
} from '../actions/actionTypes';
import {Action} from "./ability";

export interface AbilitiesProps {
  id: number,
  name: string
}

export interface PokemonProps {
  id: number,
  name: string,
  types: [],
  weight: number,
  height: number,
  base_experience: string,
  abilities: AbilitiesProps[]
}

interface PokemonReducerProps {
  pokemon: PokemonProps[] | null,
  errors: string | null
}

const initialState: PokemonReducerProps = {
  pokemon: null,
  errors: null
};

export default function pokemonReducer(state: PokemonReducerProps = initialState, action: Action) {
  switch (action.type) {
    case POKELIST_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case GET_INFO_POKEMON_SUCCESS:
      return {
        ...state,
        pokemon: action.payload,
        errors: null,
      };
    default:
      return state;
  }
}
