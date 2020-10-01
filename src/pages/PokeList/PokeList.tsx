import React, { useCallback, useState } from 'react';
import { connect } from 'react-redux';
import classes from './PokeList.module.scss';
import {
  filterPokelist,
  getPokelist,
  ListParams,
} from '../../store/actions/pokelist';
import PokeCard from '../../components/PokeCard/PokeCard';
import usePagination from '../../hooks/usePagination';
import Filter from '../../components/Filter/Filter';
import debounce from '../../functions/debounce';

interface PokeListProps {
  pokelist: [] | null;
  count: number;
  limit: number;
  getList: (param: object) => any;
  filter: (name: string) => any;
}

const PokeList: any = ({
  pokelist,
  count,
  limit,
  getList,
  filter,
}: PokeListProps) => {
  const [searchValue, changeSearchValue] = useState('');

  const debounceFilter: (value: any) => any = useCallback(
    debounce(filter, 700),
    [filterPokelist]
  );

  const onChange = (e: any) => {
    const { value } = e.target;
    changeSearchValue(value);
    debounceFilter(value);
  };
  const clearSearchValue = useCallback(() => {
    changeSearchValue('');
  }, []);

  /** Пагинация */
  const pagination = usePagination(
    {
      fnGetInfo: getList,
      limit,
      count,
      className: classes.pagination,
    },
    clearSearchValue
  );

  const pokelistTmpl =
    pokelist &&
    pokelist.map(({ name, id }) => <PokeCard id={id} name={name} key={id} />);

  const pokelistEmptyTmpl = pokelist ? null : <span>Список пуст</span>;

  return (
    <div className={classes.main}>
      <h1 className={classes.title}>Список покемонов</h1>
      <div className={classes.tools}>
        <Filter
          className={classes.filter}
          value={searchValue}
          onChange={onChange}
        />
        {pagination}
      </div>

      {pokelistEmptyTmpl}
      <div className={classes.pokelist}>{pokelistTmpl}</div>
      <div className={classes.paginationWrap}>{pagination}</div>
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
    pokelist: state.pokelist.pokelistFilter,
    count: state.pokelist.count,
    limit: state.pokelist.limit,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getList: (param: ListParams) => dispatch(getPokelist(param)),
    filter: (name: string) => dispatch(filterPokelist(name)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PokeList);
