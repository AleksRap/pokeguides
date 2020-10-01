import React from 'react';
import classes from './Preloader.module.scss';

interface PreloaderProps {
  className?: string;
}

const Preloader: React.FC<PreloaderProps> = ({ className }) => {
  const cls = [classes.preloader];
  if (className) {
    cls.push(className);
  }

  return <div className={cls.join(' ')} />;
};

export default Preloader;
