import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './PokeCard.module.scss';
import getUrlImgPokemon from '../../functions/getUrlImgPokemon';
import Preloader from '../UI/Preloader/Preloader';

interface PokeCardProps {
  id: number;
  name: string;
}

const PokeCard = ({ id, name }: PokeCardProps) => {
  const img: any = useRef(null);

  const [loading, changeLoading] = useState(true);

  useEffect(() => {
    if (img.current) {
      img.current.onload = () => {
        changeLoading(false);
      };
    }
  }, []);

  const preloader = loading ? (
    <div className={classes.preloader}>
      <Preloader />
    </div>
  ) : null;

  return (
    <NavLink className={classes.card} to={`/pokemon/${id}`}>
      <div className={classes.img}>
        {preloader}
        <img src={getUrlImgPokemon(id)} alt={name} ref={img} />
      </div>

      <div className={classes.name}>{name}</div>
    </NavLink>
  );
};

export default PokeCard;
