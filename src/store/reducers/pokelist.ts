import {
  GET_POKELIST_SUCCESS,
  POKELIST_ERROR,
  POKELIST_FILTER,
} from '../actions/actionTypes';
import { Action } from './ability';

interface PokelistProps {
  id: number;
  name: string;
}

interface PokelistReducerProps {
  pokelist: null | PokelistProps[];
  pokelistFilter: null | any[];
  count: null | number;
  limit: number;
  errors: null | string;
}

const initialState: PokelistReducerProps = {
  pokelist: null,
  pokelistFilter: null,
  count: null,
  limit: 30,
  errors: null,
};

export default function pokelistReducer(
  state: PokelistReducerProps = initialState,
  action: Action
): PokelistReducerProps {
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
        pokelistFilter: action.payload.results,
        errors: null,
      };
    case POKELIST_FILTER:
      return {
        ...state,
        pokelistFilter:
          state.pokelist &&
          state.pokelist.filter(
            ({ name }) => name.toLowerCase().indexOf(action.payload) !== -1
          ),
        errors: null,
      };
    default:
      return state;
  }
}
