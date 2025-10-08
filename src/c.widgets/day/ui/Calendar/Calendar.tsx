import classNames from 'classnames';
import { format } from 'date-fns';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import { DayInfoModal } from '@/e.entities/day/ui/DayInfoModal/DayInfoModal.tsx';
import { UiCard } from '@/f.shared/ui';

import styles from './Calendar.module.scss';

export const Calendar = () => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const todayRef = useRef<HTMLButtonElement | null>(null);

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const [selectedDay, setSelectedDay] = useState<number | null>(null);

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
    if (todayRef.current) {
      todayRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }, []);

  return (
    <UiCard ref={wrapRef} className={styles.calendar}>
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

      <DayInfoModal
        selectedDay={dateToOpen}
        onCancel={() => setSelectedDay(null)}
        footer={null}
      />
    </UiCard>
  );
};
