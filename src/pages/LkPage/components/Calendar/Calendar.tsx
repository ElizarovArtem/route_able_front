import classNames from 'classnames';
import { format } from 'date-fns';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { DayInfoModal } from '@/pages/LkPage/components/Calendar/components/DayInfoModal/DayInfoModal.tsx';

import styles from './Calendar.module.scss';

const CORRECTION_INDEX = 1;

export const Calendar = () => {
  const currentDayRef = useRef<HTMLDivElement | null>(null);
  const currentDay = new Date().getDate();

  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const daysElements = useMemo(() => {
    const daysCount = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0,
    ).getDate();

    const onDayClick = (date: number) => {
      if (currentDay === date) return;

      setSelectedDay(
        format(
          new Date(new Date().getFullYear(), new Date().getMonth(), date),
          'yyyy-MM-dd',
        ),
      );
    };

    return new Array(daysCount).fill(0).map((_, i) => (
      <div
        onClick={() => onDayClick(i + CORRECTION_INDEX)}
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

  return (
    <div className={styles.calendar}>
      {daysElements}

      <DayInfoModal
        selectedDay={selectedDay}
        onCancel={() => setSelectedDay(null)}
        footer={null}
      />
    </div>
  );
};
