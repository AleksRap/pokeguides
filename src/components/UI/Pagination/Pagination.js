import React, {useEffect, useState} from "react";
import classes from './Pagination.module.scss';

const Pagination = ({
                      className,
                      count,
                      limit,
                      currentPage,
                      onPrev,
                      onNum,
                      onNext
}) => {

  /** Добавляем классы для пагинации */
  const cls = [classes.Pagination];
  if (className) {
    cls.push(className);
  }

  /** Активная страница */
  const [activePage, changeActivePage] = useState(1);

  /** Перерисовка при изменении текущей страницы */
  useEffect(() => {
    changeActivePage(currentPage ? +currentPage : 1)
  }, [currentPage, changeActivePage]);

  /** Получаем число страниц */
  const countPage = Math.ceil(count / limit);
  if (countPage <= 1) return null;

  /** Делаем активной предыдущую страницу */
  const prevPage = () => changeActivePage(activePage - 1);

  /** Делаем активной страницу под указанным номером */
  const numPage = (num) => changeActivePage(num);

  /** Длаем активной следующую страницу */
  const nextPage = () => changeActivePage(activePage + 1);

  /** Шаблон боковых элементов */
  const directionTmpl = (direction = 'next') => {
    let handlerClick;
    let show = false;
    let label = '';

    switch (direction) {
      case 'prev':
        handlerClick = () => {
          onPrev(activePage - 1);
          prevPage();
        }
        show = activePage !== 1;
        label = 'Предыдущая'
        break;
      case 'next':
        handlerClick = () => {
          onNext(activePage + 1);
          nextPage();
        }
        show = activePage !== countPage;
        label = 'Следующая'
        break;
      default:
        break;
    }
    return show
      ? (
        <span
          className={classes[direction]}
          onClick={handlerClick}
        >
          {label}
        </span>
      )
      : null;
  }

  /** Dot шаблон */
  const dotTmpl = (countPage - activePage) > 5
    ? <span className={classes.dot}>...</span>
    : null;

  /** Шаблон нумерованной страницы */
  const numTmpl = (num, active = false) => {
    const cls = [classes.num];
    if (active) {
      cls.push(classes.active);
    }

    const handlerClick = () => {
      onNum(num);
      numPage(num);
    }

    return (
      <span
        className={cls.join(' ')}
        onClick={handlerClick}
        key={num}
      >
        {num}
      </span>
    );
  }

  /** Шаблон остальных пяти страниц */
  const fivePagesTmpl = () => {
    const fivePages = [];

    const startPage = (countPage - activePage) > 5
      ? activePage
      : countPage > 5
        ? countPage - 5
        : 1;

    for (let i = startPage; i < startPage + 5 && i < countPage; i++) {
      if (i === activePage) {
        fivePages.push(numTmpl(i, true));
      } else {
        fivePages.push(numTmpl(i));
      }
    }

    return fivePages;
  }

  /** Шаблон последней страницы */
  const lastPageTmpl = activePage === countPage
    ? numTmpl(countPage, true)
    : numTmpl(countPage);

  return (
    <div className={cls.join(' ')}>
      {directionTmpl('prev')}

      <div className={classes.nums}>
        {fivePagesTmpl()}
        {dotTmpl}
        {lastPageTmpl}
      </div>

      {directionTmpl('next')}
    </div>
  )
};

export default Pagination;
