import axiosCustom from '../../axios/config';
import {
  GET_POKELIST_SUCCESS,
  POKELIST_ERROR,
} from './actionTypes';
import serialize from "../../functions/serialize";

export function getPokelistSuccess(pokeinfo) {

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

export function pokelistError(error) {
  return {
    type: POKELIST_ERROR,
    payload: error
  }
}

export function getPokelist(params) {
  return async dispatch => {

    let formatParams = '';
    if (params) formatParams = params
      ? `?${serialize(params)}`
      : '';

    const url = `pokemon${formatParams}`;

    try {
      const response = await axiosCustom.get(url);
      dispatch(getPokelistSuccess(response.data));
    } catch (e) {
      e.response && dispatch(pokelistError(e.response.data.errors));
    }
  }
}
