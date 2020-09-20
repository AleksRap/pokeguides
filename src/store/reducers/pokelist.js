import {
  GET_POKELIST_SUCCESS,
  POKELIST_ERROR,
} from '../actions/actionTypes';

const initialState = {
  pokelist: null,
  count: null,
  limit: 20,
  errors: null
};

export default function pokelistReducer(state = initialState, action) {
  switch (action.type) {
    case POKELIST_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case GET_POKELIST_SUCCESS:
      return {
        ...state,
        count: action.payload.count,
        pokelist: action.payload.results,
        errors: null,
      };
    default:
      return state;
  }
}
