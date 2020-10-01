import { ThunkAction } from 'redux-thunk';
import axiosCustom from '../../axios/config';
import {
  GET_POKELIST_SUCCESS,
  POKELIST_ERROR,
  POKELIST_FILTER,
} from './actionTypes';
import serialize from '../../functions/serialize';
import { Action } from './ability';

interface PokelistServerProps {
  url: string;
  name: string;
}

interface Results {
  results: PokelistServerProps[];
}

export interface ListParams {
  limit: number;
  offset: number;
}

export function getPokelistSuccess(pokeinfo: Results): Action {
  /**
   * Приводим результаты к нужному виду
   */
  const formatResults = pokeinfo.results.map(({ name, url }) => {
    const formatName = name[0].toUpperCase() + name.slice(1);
    const id = +url.split('/').reverse()[1];

    return {
      name: formatName,
      id,
    };
  });

  return {
    type: GET_POKELIST_SUCCESS,
    payload: {
      ...pokeinfo,
      results: formatResults,
    },
  };
}

export function filterPokelist(name: string): Action {
  return {
    type: POKELIST_FILTER,
    payload: name.toLowerCase(),
  };
}

export function pokelistError(error: string): Action {
  return {
    type: POKELIST_ERROR,
    payload: error,
  };
}

export function getPokelist(
  params: ListParams
): ThunkAction<any, any, any, any> {
  return async (dispatch: (arg: Action) => any) => {
    let formatParams = '';
    if (params) formatParams = params ? `?${serialize(params)}` : '';

    const url = `pokemon${formatParams}`;

    try {
      const response = await axiosCustom.get(url);
      dispatch(getPokelistSuccess(response.data));
    } catch (e) {
      if (e.response) {
        dispatch(pokelistError(e.response.data));
      }
    }
  };
}
