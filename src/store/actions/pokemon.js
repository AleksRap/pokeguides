import axiosCustom from '../../axios/config';
import {
  GET_INFO_POKEMON_SUCCESS,
  INFO_POKEMON_ERROR,
} from './actionTypes';

export function getInfoPokemonSuccess(pokemon) {
  return {
    type: GET_INFO_POKEMON_SUCCESS,
    payload: pokemon
  }
}

export function infoPokemonError(error) {
  return {
    type: INFO_POKEMON_ERROR,
    payload: error
  }
}

export function getInfoPokemon(id) {
  return async dispatch => {
    const url = `pokemon/${id}`;

    try {
      const response = await axiosCustom.get(url);
      dispatch(getInfoPokemonSuccess(response.data));
    } catch (e) {
      e.response && dispatch(infoPokemonError(e.response.data.errors));
    }
  }
}
