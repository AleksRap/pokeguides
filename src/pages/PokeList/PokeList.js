import React from 'react';
import {connect} from "react-redux";
import classes from './PokeList.module.scss'
import {getPokelist} from "../../store/actions/pokelist";
import PokeCard from "../../components/PokeCard/PokeCard";
import usePagination from "../../hooks/usePagination";

const PokeList = ({
                    pokelist,
                    count,
                    limit,
                    getPokelist
}) => {
  /** Пагинация */
  const pagination = usePagination({
    fnGetInfo: getPokelist,
    limit,
    count,
    className: classes.pagination,
  });

  const pokelistTmpl = pokelist && pokelist.map(({name, id}) => (
    <PokeCard
      id={id}
      name={name}
      key={id}
    />
  ));

  const pokelistEmptyTmpl = pokelist
    ? null
    : <span>Список пуст</span>;

  return (
    <main>
      {pokelistEmptyTmpl}
      {pagination}
      <div className={classes.pokelist}>
        {pokelistTmpl}
      </div>
      {pagination}
    </main>
  );
}

function mapStateToProps(state) {
  return {
    pokelist: state.pokelist.pokelist,
    count: state.pokelist.count,
    limit: state.pokelist.limit,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPokelist: (param) => dispatch(getPokelist(param))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokeList);
