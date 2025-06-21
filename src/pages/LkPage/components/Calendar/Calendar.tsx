import classNames from 'classnames';
import React, { useEffect, useMemo, useRef } from 'react';

import styles from './Calendar.module.scss';

const CORRECTION_INDEX = 1;

export const Calendar = () => {
  const currentDayRef = useRef<HTMLDivElement | null>(null);
  const currentDay = new Date().getDate();

  const daysElements = useMemo(() => {
    const daysCount = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0,
    ).getDate();

    return new Array(daysCount).fill(0).map((_, i) => (
      <div
        className={classNames(styles.day, {
          [styles.dayCurrent]: i === currentDay - CORRECTION_INDEX,
          [styles.dayDisabled]: i > currentDay - CORRECTION_INDEX,
        })}
        {...(i === currentDay - CORRECTION_INDEX && {
          ref: currentDayRef,
        })}
        key={i}
      >
        {i + CORRECTION_INDEX}
      </div>
    ));
  }, []);

  useEffect(() => {
    if (currentDayRef.current) {
      currentDayRef.current.scrollIntoView();
    }
  }, []);

  return <div className={styles.calendar}>{daysElements}</div>;
};
