import { combineReducers } from 'redux';
import pokelistReducer from './pokelist';
import pokemonReducer from './pokemon';
import abilityReducer from './ability';

export default combineReducers({
  pokelist: pokelistReducer,
  pokemon: pokemonReducer,
  ability: abilityReducer,
});
