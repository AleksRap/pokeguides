import React, { useEffect, useMemo, useState } from 'react';
import Preloader from '../components/UI/Preloader/Preloader';

/**
 * Прелоадер использует искусственную задержку, для того чтобы не было моргания при слишком быстрой загрузке
 * @param component
 * @param fn
 * @returns {JSX.Element|*}
 */
const usePreloader = (component: React.ReactNode, fn: () => void) => {
  const [loading, changeLoading] = useState<boolean>(true);

  const delay = 700;
  const timeStart: number = useMemo(() => new Date().getTime(), []);
  useEffect(() => {
    let timeout: any;
    const timeEnd: number | null = new Date().getTime();

    (async () => {
      await fn();
      const different: number = timeEnd - timeStart;

      if (different >= delay) {
        changeLoading(false);
      } else {
        const remains = delay - different;
        timeout = setTimeout(() => changeLoading(false), remains);
      }
    })();

    return () => clearTimeout(timeout);
  }, [fn, changeLoading, timeStart]);

  return loading ? <Preloader /> : component;
};

export default usePreloader;
