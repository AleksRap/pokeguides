import React from 'react';
import Hello from '../pages/Hello/Hello';
import PokeList from '../pages/PokeList/PokeList';
import PokePage from '../pages/PokePage/PokePage';
import Error404 from '../pages/Error404/Error404';
import AbilityPage from '../pages/AbilityPage/AbilityPage';

export interface RoutesProps {
  name: string;
  path: string;
  url?: any;
  label?: string | undefined;
  component: React.ReactNode | any;
  exact?: boolean | undefined;
}

const routes: RoutesProps[] = [
  {
    name: 'hello',
    path: '/',
    url: '/',
    label: 'Главная',
    component: Hello,
    exact: true,
  },
  {
    name: 'pokelist',
    path: '/pokelist/:page',
    url: '/pokelist/1',
    label: 'Список',
    component: PokeList,
  },
  {
    name: 'pokemon',
    path: '/pokemon/:id',
    component: PokePage,
  },
  {
    name: 'ability',
    path: '/ability/:id',
    component: AbilityPage,
  },
  {
    name: 'error-404',
    path: '',
    component: Error404,
  },
];

export default routes;
