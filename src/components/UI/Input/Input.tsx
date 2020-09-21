import * as React from 'react';
import classes from './Input.module.scss';

interface InputProps {
  type?: string,
  className?: string,
  onChange: (e: React.ChangeEvent) => void,
  value?: string,
  placeholder?: string
}

const Input = ({
                 type = 'text',
                 className,
                 onChange,
                 value,
                 placeholder
}: InputProps) => {

  /** Формируем css классы */
  const cls: string[] = [classes.input];
  if (className) {
    cls.push(className);
  }

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cls.join(' ')}
    />
  );
};

export default Input;
