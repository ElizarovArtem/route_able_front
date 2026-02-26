import classNames from 'classnames';
import { format } from 'date-fns';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { DayInfoModal } from '@/e.entities/day/ui/DayInfoModal/DayInfoModal.tsx';
import { UiCard, UiFlex, UiTypography } from '@/f.shared/ui';

import styles from './Calendar.module.scss';

export const Calendar = () => {
  const todayRef = useRef<HTMLButtonElement | null>(null);
  const daysRef = useRef<HTMLDivElement | null>(null);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = now.toLocaleString('ru-RU', { month: 'long' });
  const monthCapitalized =
    monthName.charAt(0).toUpperCase() + monthName.slice(1);

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [currentDayLeft, setCurrentDayLeft] = useState<number | null>(null);

  const dateToOpen = useMemo(() => {
    if (selectedDay) {
      return format(
        new Date(new Date().getFullYear(), new Date().getMonth(), selectedDay),
        'yyyy-MM-dd',
      );
    }

    return null;
  }, [selectedDay]);

  const days = useMemo(
    () =>
      Array.from({ length: daysInMonth }, (_, i) => {
        const day = i + 1;
        const date = new Date(year, month, day);
        const state = day === today ? 'today' : day > today ? 'future' : 'past';
        return { day, date, state };
      }),
    [daysInMonth, month, year, today],
  );

  useEffect(() => {
    if (daysRef.current && currentDayLeft) {
      daysRef.current.scrollTo({
        left: currentDayLeft - daysRef.current.clientWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [currentDayLeft]);

  useEffect(() => {
    if (todayRef.current) {
      setCurrentDayLeft(todayRef.current.offsetLeft);
    }
  }, []);

  return (
    <UiCard className={styles.calendar}>
      <UiFlex direction="column" gap="s">
        <UiTypography bold className={styles.monthTitle}>
          {monthCapitalized} {now.toLocaleString('ru-RU', { year: 'numeric' })}
        </UiTypography>
        <UiFlex className={styles.daysRow} ref={daysRef}>
          {days.map(({ day, state }) => {
            const isToday = state === 'today';
            const isFuture = state === 'future';
            const isSelected = selectedDay === day;

            return (
              <button
                key={day}
                ref={isToday ? todayRef : undefined}
                type="button"
                className={classNames(styles.chip, {
                  [styles.isToday]: isToday,
                  [styles.isFuture]: isFuture,
                  [styles.isSelected]: isSelected,
                })}
                onClick={() => !isFuture && setSelectedDay(day)}
                aria-selected={isSelected}
                disabled={isFuture}
              >
                <span className={styles.num}>{day}</span>
              </button>
            );
          })}
        </UiFlex>
      </UiFlex>

      <DayInfoModal
        selectedDay={dateToOpen}
        onCancel={() => setSelectedDay(null)}
      />
    </UiCard>
  );
};
