import React from "react";
import { NavLink, Switch } from "react-router-dom";
import classes from "./App.module.scss";

import routes from "./route/routes";
import getListRoutes from "./route/getListRoutes";

function App() {
  /** Список роутов */
  const listRoutes: React.ReactNode[] = getListRoutes(routes);

  /** Список ссылок */
  const navListRoutes = routes.filter(({ name }) => {
    switch (name) {
      case "hello":
      case "pokelist":
        return true;
      default:
        return false;
    }
  });

  const navigation = navListRoutes.map(({ label, url, exact }) => (
    <NavLink
      key={url}
      to={url}
      exact={exact}
      className={classes.link}
      activeClassName={classes.active}
    >
      {label}
    </NavLink>
  ));

  return (
    <main className={classes.content}>
      <nav className={classes.nav}>{navigation}</nav>
      <Switch>{listRoutes}</Switch>
    </main>
  );
}

export default App;
