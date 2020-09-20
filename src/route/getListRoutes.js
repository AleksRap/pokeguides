import React from "react";
import {Route} from "react-router-dom";

/**
 * На входе массив с инфой о роутах
 * на выходе список роутов
 * @param routes
 * @returns {*}
 */
export default function getListRoutes(routes) {
  return routes.map(({path, component, exact}) => {
    return(
      <Route
        path={path}
        component={component}
        exact={exact}
        key={path}
      />
    );
  });
}
