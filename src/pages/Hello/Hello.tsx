import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Hello.module.scss';

const Hello = (): React.ReactNode => (
  <div className={classes.body}>
    <h1>Добро пожаловать в справочник покемонов</h1>
    <h2>PokeGuides</h2>
    <NavLink
      className={classes.btn}
      to='/pokelist/1'
    >Перейти в список</NavLink>
  </div>
);

export default Hello;
