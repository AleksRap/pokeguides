import React from 'react';
import classes from './Filter.module.scss';
import Input from '../UI/Input/Input';

interface FilterProps {
  className: string;
  value: string;
  onChange: (e: React.ChangeEvent) => void;
}

const Filter: React.FC<FilterProps> = ({ className, value, onChange }) => {
  const cls: string[] = [classes.filter];
  if (className) {
    cls.push(className);
  }

  return (
    <div className={cls.join(' ')}>
      <Input
        placeholder="Введите имя для поиска по текущей странице"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Filter;
