import {
  GET_INFO_POKEMON_SUCCESS,
  POKELIST_ERROR,
} from '../actions/actionTypes';

const initialState = {
  pokemon: null,
  errors: null
};

export default function pokemonReducer(state = initialState, action) {
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
