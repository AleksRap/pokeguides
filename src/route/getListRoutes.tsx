import React from 'react';
import { Route } from 'react-router-dom';
import { RoutesProps } from './routes';

/**
 * На входе массив с инфой о роутах
 * на выходе список роутов
 * @param routes
 * @returns {*}
 */

export default function getListRoutes(
  routes: RoutesProps[]
): Array<React.ReactNode> {
  return routes.map(
    ({ path, component, exact }): React.ReactNode => (
      <Route path={path} component={component} exact={exact} key={path} />
    )
  );
}
