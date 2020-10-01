import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import classes from './AbilityPage.module.scss';
import { getInfoAbility } from '../../store/actions/ability';
import About from '../../components/About/About';
import usePreloader from '../../hooks/usePreloader';
import { AbilityInterface } from '../../store/reducers/ability';

interface AbilityPageProps {
  ability: AbilityInterface | null;
  getInfo: (id: number) => any;
}

const AbilityPage: any = ({ ability, getInfo }: AbilityPageProps) => {
  /** Параметры роутов */
  const { id } = useParams();

  const descr =
    ability &&
    ability?.effectEntries.map(
      (text: string): React.ReactNode => <p key={text}>{text}</p>
    );

  const content = (
    <About name={ability?.name}>
      <div className={classes.descr}>{descr}</div>
    </About>
  );

  const callback = useCallback(() => getInfo(id), [getInfo, id]);

  return usePreloader(content, callback);
};

function mapStateToProps(state: any) {
  return {
    ability: state.ability.ability,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getInfo: (id: number) => dispatch(getInfoAbility(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AbilityPage);
