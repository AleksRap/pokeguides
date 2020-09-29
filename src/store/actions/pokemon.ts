/* eslint-disable camelcase */
import axiosCustom from '../../axios/config';
import { GET_INFO_POKEMON_SUCCESS, INFO_POKEMON_ERROR } from './actionTypes';

interface AbilityProps {
  name: string;
  url: string;
}

interface AbilitiesProps {
  ability: AbilityProps;
}

interface PokemonInfoProps {
  id: number;
  types: [];
  name: string;
  weight: number;
  height: number;
  base_experience: number;
  abilities: AbilitiesProps[];
}

export function getInfoPokemonSuccess({
  id,
  name,
  weight,
  height,
  base_experience,
  types,
  abilities,
}: PokemonInfoProps) {
  /**
   * Приводим результаты к нужному виду
   */
  const abilitiesFormat = abilities.map(
    ({ ability: { name: nameAbility, url } }) => {
      const formatName = nameAbility[0].toUpperCase() + nameAbility.slice(1);
      const idAbility: number = +url.split('/').reverse()[1];

      return {
        name: formatName,
        id: idAbility,
      };
    }
  );

  const formatPokemonInfo = {
    id,
    name: name[0].toUpperCase() + name.slice(1),
    types: types.map(({ type: { name: nameType } }) => nameType).join(', '),
    weight,
    height,
    base_experience,
    abilities: abilitiesFormat,
  };

  return {
    type: GET_INFO_POKEMON_SUCCESS,
    payload: formatPokemonInfo,
  };
}

export function infoPokemonError(error: string) {
  return {
    type: INFO_POKEMON_ERROR,
    payload: error,
  };
}

export function getInfoPokemon(id: number | string) {
  return async (dispatch: any) => {
    const url = `pokemon/${id}`;

    try {
      const response = await axiosCustom.get(url);
      dispatch(getInfoPokemonSuccess(response.data));
    } catch (e) {
      if (e.response) {
        dispatch(infoPokemonError(e.response.data));
      }
    }
  };
}
