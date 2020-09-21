import React, {useCallback} from 'react';
import {NavLink, useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import classes from './PokePage.module.scss'
import {getInfoPokemon} from '../../store/actions/pokemon';
import About from '../../components/About/About';
import usePreloader from '../../hooks/usePreloader';
import {AbilitiesProps} from '../../store/reducers/pokemon';

interface PokePageProps {
  pokemon: any,
  getInfo: (param: object) => any
}

const PokePage = ({
                    pokemon,
                    getInfo
}: PokePageProps) => {
  /** Параметры роутов */
  const {id} = useParams();

  const params = pokemon && Object.keys(pokemon).map((key: any) => {
    if (key === 'abilities') {
      return null;
    }

    return (
      <div
        key={key}
        className={classes.row}
      >
        <div className={classes.cell}>{key}</div>
        <div className={classes.cell}>{pokemon[key]}</div>
      </div>
    );
  });

  const abilitiesTmpl = pokemon?.abilities && pokemon?.abilities.map(({name, id: idAbility}: AbilitiesProps) => (
    <NavLink
      to={`/ability/${idAbility}`}
      key={idAbility}
      className={classes.link}
    >
      {name}
    </NavLink>
  ));

  const content = (
    <About
      id={id}
      name={pokemon?.name}
    >
      <div className={classes.table}>
        <div className={[classes.row, classes.head].join(' ')}>
          <div className={classes.cell}>Параметр</div>
          <div className={classes.cell}>Значение</div>
        </div>
        {params}
        <div className={classes.row}>
          <div className={classes.cell}>abilities</div>
          <div className={[classes.cell, classes.abilities].join(' ')}>
            {abilitiesTmpl}
          </div>
        </div>
      </div>
    </About>
  );

  const callback = useCallback(() => getInfo(id), [getInfo, id]);

  return usePreloader(content, callback)
}


function mapStateToProps(state: any) {
  return {
    pokemon: state.pokemon.pokemon,
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    getInfo: (id: number) => dispatch(getInfoPokemon(id))
  }
}

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(PokePage);
