import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import Pagination from "../components/UI/Pagination/Pagination";

/**
 * Пагинация
 * @param fnGetInfo
 * @param limit
 * @param count
 * @param className
 * @param filters
 * @param callback
 * @returns {JSX.Element}
 */
export default function usePagination({fnGetInfo, limit, count, className, filters}) {

  /** Объект истории */
  const history = useHistory();

  /** Объект местоположения */
  const location = useLocation();

  /** Параметры роутов */
  const routeParams = useParams();
  const { page } = routeParams;

  /** Параметры запроса списка */
  const [param, changeParam] = useState({limit, offset: 0, ...filters});
  const currentOffset = limit * (+page - 1);
  if (param.offset !== currentOffset) {
    changeParam({...param, offset: currentOffset})
  }

  /** Функция получения списка элементов */
  const getInfoCallback = useCallback(() => {
    fnGetInfo(param);
  }, [fnGetInfo, param]);

  /** Получаем список элементов */
  useEffect(() => {getInfoCallback()}, [getInfoCallback]);

  /** Выполняется при кликах на пагинации */
  const onHandlerPagination = (num) => {

    /** Убираем параметр страницы из пути если он есть */
    const arrPathWithoutParamPage = location.pathname.split('/');
    if (page) {
      arrPathWithoutParamPage.splice(arrPathWithoutParamPage.length - 1, 1);
    }
    const pathWithoutParamPage = arrPathWithoutParamPage.join('/')

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
