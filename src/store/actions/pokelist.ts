import axiosCustom from '../../axios/config';
import {
  GET_POKELIST_SUCCESS,
  POKELIST_ERROR, POKELIST_FILTER,
} from './actionTypes';
import serialize from '../../functions/serialize';

interface PokelistServerProps {
  url: string,
  name: string
}

interface Results {
  results: PokelistServerProps[]
}

export interface ListParams {
  limit: number,
  offset: number
}

export function getPokelistSuccess(pokeinfo: Results) {

  /**
   * Приводим результаты к нужному виду
   */
  const formatResults = pokeinfo.results.map(({name, url}) => {
    const formatName = name[0].toUpperCase() + name.slice(1)
    const id = +url.split('/').reverse()[1];

    return {
      name: formatName,
      id
    }
  });

  return {
    type: GET_POKELIST_SUCCESS,
    payload: {
      ...pokeinfo,
      results: formatResults
    }
  }
}

export function filterPokelist(name: string) {
  return {
    type: POKELIST_FILTER,
    payload: name.toLowerCase()
  }
}

export function pokelistError(error: string) {
  return {
    type: POKELIST_ERROR,
    payload: error
  }
}

export function getPokelist(params: ListParams) {
  return async (dispatch: any) => {

    let formatParams = '';
    if (params) formatParams = params
      ? `?${serialize(params)}`
      : '';

    const url = `pokemon${formatParams}`;

    try {
      const response = await axiosCustom.get(url);
      dispatch(getPokelistSuccess(response.data));
    } catch (e) {
      if (e.response) {
        dispatch(pokelistError(e.response.data));
      }
    }
  }
}
