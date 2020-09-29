import React, { useEffect, useState } from "react";
import Preloader from "../components/UI/Preloader/Preloader";

/**
 * Прелоадер использует искусственную задержку, для того чтобы не было моргания при слишком быстрой загрузке
 * @param component
 * @param fn
 * @returns {JSX.Element|*}
 */
const usePreloader = (component: React.ReactNode, fn: () => void) => {
  const [loading, changeLoading] = useState<boolean>(true);

  const delay: number = 700;
  const timeStart: number = new Date().getTime();
  let timeEnd: number | null = null;

  useEffect(() => {
    let timeout: any;

    (async () => {
      await fn();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeEnd = new Date().getTime();
      const different: number = timeEnd - timeStart;

      if (different >= delay) {
        changeLoading(false);
      } else {
        const remains = delay - different;
        timeout = setTimeout(() => changeLoading(false), remains);
      }
    })();

    return () => clearTimeout(timeout);
  }, [fn, changeLoading]);

  return loading ? <Preloader /> : component;
};

export default usePreloader;
