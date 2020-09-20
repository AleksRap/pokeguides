import React from 'react';
import classes from './PokeCard.module.scss';
import getUrlImgPokemon from "../../functions/getUrlImgPokemon";

const PokeCard = ({id, name}) => {

  return (
    <div className={classes.card}>
      <div
        className={classes.img}
      >
        <img
          src={getUrlImgPokemon(id)}
          alt="pokeimg"
        />
      </div>

      <div
        className={classes.name}
      >
        {name}
      </div>
    </div>
  );
}

export default PokeCard;
