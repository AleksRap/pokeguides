import React, {useEffect, useState} from "react";
import classes from './Pagination.module.scss';

interface PaginationProps {
  className: string,
  count: number,
  limit: number,
  currentPage: number,
  onPrev: (num: number) => void,
  onNum: (num: number) => void,
  onNext: (num: number) => void
}

const Pagination = ({
                      className,
                      count,
                      limit,
                      currentPage,
                      onPrev,
                      onNum,
                      onNext
}: PaginationProps) => {

  /** Добавляем классы для пагинации */
  const cls: string[] = [classes.Pagination];
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
  const prevPage = (): void => changeActivePage(activePage - 1);

  /** Делаем активной страницу под указанным номером */
  const numPage = (num: number): void => changeActivePage(num);

  /** Длаем активной следующую страницу */
  const nextPage = (): void => changeActivePage(activePage + 1);

  /** Шаблон боковых элементов */
  const directionTmpl = (direction: string = 'next'): React.ReactNode | null => {
    let handlerClick: () => void = () => {};
    let show: boolean = false;

    switch (direction) {
      case 'prev':
        handlerClick = (): void => {
          onPrev(activePage - 1);
          prevPage();
        }
        show = activePage !== 1;
        break;
      case 'next':
        handlerClick = (): void => {
          onNext(activePage + 1);
          nextPage();
        }
        show = activePage !== countPage;
        break;
      default:
        break;
    }

    return show
      ? (
        <span
          role="presentation"
          className={classes[direction]}
          onClick={handlerClick}
        />
      )
      : null;
  }

  /** Dot шаблон */
  const dotTmpl = (countPage - activePage) > 5
    ? <span className={classes.dot}>...</span>
    : null;

  /** Шаблон нумерованной страницы */
  const numTmpl = (num: number, active: boolean = false): React.ReactNode => {
    const clsNum: string[] = [classes.num];
    if (active) {
      clsNum.push(classes.active);
    }

    const handlerClick = (): void => {
      onNum(num);
      numPage(num);
    }

    return (
      <span
        role='presentation'
        className={clsNum.join(' ')}
        onClick={handlerClick}
        key={num}
      >
        {num}
      </span>
    );
  }

  /** Шаблон остальных пяти страниц */
  const fivePagesTmpl = (): React.ReactNode => {
    const fivePages: React.ReactNode[] = [];

    let startPage: number;
    if ((countPage - activePage) > 5) {
      startPage = activePage;
    } else if (countPage > 5) {
      startPage = countPage - 5;
    } else {
      startPage = 1;
    }

    for (let i: number = startPage; i < startPage + 5 && i < countPage; i += 1) {
      if (i === activePage) {
        fivePages.push(numTmpl(i, true));
      } else {
        fivePages.push(numTmpl(i));
      }
    }

    return fivePages;
  }

  /** Шаблон последней страницы */
  const lastPageTmpl: React.ReactNode = activePage === countPage
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
