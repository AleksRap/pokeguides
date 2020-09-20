import React from 'react';
import classes from './Hello.module.scss';
import Button from "../../components/UI/Button/Button";

const Hello = () => (
  <main className={classes.body}>
    <h1>Добро пожаловать в справочник покемонов</h1>
    <h2>PokeGuides</h2>
    <Button
      text='Перейти в список'
      className={classes.btn}
    />
  </main>
);

export default Hello;
