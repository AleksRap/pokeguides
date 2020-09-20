import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Pagination from "../components/UI/Pagination/Pagination";

/**
 * Пагинация
 * @param fnGetInfo
 * @param limit
 * @param count
 * @param className
 * @param callback
 * @returns {JSX.Element}
 */
interface UsePaginationInterface {
  fnGetInfo: (param: object) => void,
  limit: number,
  count: number,
  className: string,
}

export default function usePagination({
                                        fnGetInfo,
                                        limit,
                                        count,
                                        className
                                      }: UsePaginationInterface, callback: () => any) {

  /** Объект истории */
  const history = useHistory();

  /** Объект местоположения */
  const location = useLocation();

  /** Параметры роутов */
  const {page} = useParams();

  /** Параметры запроса списка */
  const [param, changeParam] = useState({limit, offset: 0});
  const currentOffset: number = limit * (+page - 1);

  if (param.offset !== currentOffset) {
    changeParam({...param, offset: currentOffset})
  }

  /** Функция получения списка элементов */
  const getInfoCallback = useCallback(async () => {
    await fnGetInfo(param);
    if (callback) {
      callback();
    }
  }, [fnGetInfo, param, callback]);

  /** Получаем список элементов */
  useEffect(() => {getInfoCallback()}, [getInfoCallback]);

  /** Выполняется при кликах на пагинации */
  const onHandlerPagination = (num: number): void => {

    /** Убираем параметр страницы из пути если он есть */
    const arrPathWithoutParamPage: string[] = location.pathname.split('/');
    if (page) {
      arrPathWithoutParamPage.splice(arrPathWithoutParamPage.length - 1, 1);
    }
    const pathWithoutParamPage: string = arrPathWithoutParamPage.join('/')

    /** Перебрасываем на url страницы */
    history.push({pathname: `${pathWithoutParamPage}/${num}`})

    const newParam = {
      ...param,
      offset: limit * (num - 1)
    }
    changeParam(newParam);
  }

  return (
    <Pagination
      className={className}
      count={count}
      limit={limit}
      currentPage={page}
      onPrev={onHandlerPagination}
      onNum={onHandlerPagination}
      onNext={onHandlerPagination}
    />
  );
}
