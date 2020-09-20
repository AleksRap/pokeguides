import React from 'react';
import classes from './Error404.module.scss'

const Error404 = () => (
  <div className={classes.error}>
    <span className={classes.num}>404</span>
    <span className={classes.text}>Page not Found</span>
  </div>
);

export default Error404;
