import {
  GET_INFO_ABILITY_SUCCESS,
  INFO_ABILITY_ERROR,
} from '../actions/actionTypes';

export interface Action {
  type: string;
  payload: any;
}

export interface AbilityInterface {
  id: number;
  name: string;
  effectEntries: [];
}

interface AbilityReducerProps {
  ability: AbilityInterface | null;
  errors: string | null;
}

const initialState: AbilityReducerProps = {
  ability: null,
  errors: null,
};

export default function abilityReducer(
  state: AbilityReducerProps = initialState,
  action: Action
) {
  switch (action.type) {
    case INFO_ABILITY_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case GET_INFO_ABILITY_SUCCESS:
      return {
        ...state,
        ability: action.payload,
        errors: null,
      };
    default:
      return state;
  }
}
