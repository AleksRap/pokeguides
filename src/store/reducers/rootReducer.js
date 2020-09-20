import { combineReducers } from 'redux';
import pokelistReducer from './pokelist';
import pokemonReducer from './pokemon';

export default combineReducers({
  pokelist: pokelistReducer,
  pokemon: pokemonReducer
})
