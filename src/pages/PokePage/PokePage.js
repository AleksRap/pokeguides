import React, {useEffect} from 'react';
import { useParams } from "react-router-dom";
import {connect} from "react-redux";
import classes from './PokePage.module.scss'
import {getInfoPokemon} from "../../store/actions/pokemon";
import getUrlImgPokemon from "../../functions/getUrlImgPokemon";

const PokePage = ({getInfoPokemon, pokemon}) => {

  /** Параметры роутов */
  const routeParams = useParams();
  const { id } = routeParams;

  useEffect(() => {
    getInfoPokemon(id);
  }, []);

  return (
    <div className={classes.pokepage}>
      <div
        className={classes.img}
      >
        <img
          src={getUrlImgPokemon(id)}
          alt="pokemon"
        />
      </div>
      {pokemon?.name}
    </div>
  );
}


function mapStateToProps(state) {
  return {
    pokemon: state.pokemon.pokemon,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getInfoPokemon: (id) => dispatch(getInfoPokemon(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokePage);
