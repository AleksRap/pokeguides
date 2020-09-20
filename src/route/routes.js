import Hello from "../pages/Hello/Hello";
import PokeList from "../pages/PokeList/PokeList";
import PokePage from "../pages/PokePage/PokePage";
import Error404 from "../pages/Error404/Error404";

export default [
  {
    name: 'hello',
    path: '/',
    component: Hello,
    exact: true
  }, {
    name: 'pokelist',
    path: '/pokelist/:page',
    component: PokeList
  }, {
    name: 'pokemon',
    path: '/pokemon/:id',
    component: PokePage
  }, {
    name: 'error-404',
    path: '',
    component: Error404,
    privateUrl: false,
  }
];
