/* eslint-disable camelcase */
import axiosCustom from '../../axios/config';
import {
  GET_INFO_ABILITY_SUCCESS,
  INFO_ABILITY_ERROR,
} from './actionTypes';

interface InfoAbility {
  id: number,
  name: string,
  effect_entries: []
}

export function getInfoAbilitySuccess({id, name, effect_entries}: InfoAbility) {

  /**
   * Приводим результаты к нужному виду
   */
  const abilityFormat = {
    id,
    name: name[0].toUpperCase() + name.slice(1),
    effectEntries: effect_entries.map(({effect}) => effect)
  }

  return {
    type: GET_INFO_ABILITY_SUCCESS,
    payload: abilityFormat
  }
}

export function infoAbilityError(error: string) {
  return {
    type: INFO_ABILITY_ERROR,
    payload: error
  }
}

export function getInfoAbility(id: number | string) {
  return async (dispatch: any) => {
    const url = `ability/${id}`;

    try {
      const response = await axiosCustom.get(url);
      dispatch(getInfoAbilitySuccess(response.data));
    } catch (e) {
      if (e.response) {
        dispatch(infoAbilityError(e.response.data.errors));
      }
    }
  }
}
