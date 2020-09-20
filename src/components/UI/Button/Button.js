import React from 'react';
import classes from './Button.module.scss'

const Button = ({text, className, onClick, light}) => {
  const cls = [classes.btn];
  className && cls.push(className);
  light && cls.push(classes.light);

  return (
    <button
      className={cls.join(' ')}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
