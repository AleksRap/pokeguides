import React from 'react';
import { Switch } from 'react-router-dom';

import routes from './route/routes';
import getListRoutes from "./route/getListRoutes";

function App() {

  /** Список роутов */
  const listRoutes = getListRoutes(routes);

  return (
    <Switch>
      {listRoutes}
    </Switch>
  );
}

export default App;
