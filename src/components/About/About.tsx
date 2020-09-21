import React from 'react';
import classes from './About.module.scss'
import getUrlImgPokemon from '../../functions/getUrlImgPokemon';

interface AboutProps {
  id?: number,
  name: string | undefined,
  children?: React.ReactNode
}

const About = ({
                 id,
                 name,
                 children
}: AboutProps) => {

  const img: React.ReactNode | null = id
    ? (
      <div
        className={classes.img}
      >
        <img
          src={getUrlImgPokemon(id)}
          alt={name}
        />
      </div>
    )
    : null;

  return (
    <div className={classes.about}>
      <h1>{name} - детальная информация</h1>
      {img}
      {children}
    </div>
  );
}

export default About;
