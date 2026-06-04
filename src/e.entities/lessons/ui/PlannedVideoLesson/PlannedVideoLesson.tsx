import React from 'react';

import type { PlannedLesson } from '@/e.entities/lessons/model/lessons.types.ts';

import styles from './PlannedVideoLesson.module.scss';

type VideoLessonProps = {
  lesson: PlannedLesson;
};

export const PlannedVideoLesson = ({ lesson }: VideoLessonProps) => {
  const startTime = new Date(lesson.startAt).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const endTime = new Date(lesson.endAt).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
  const date = new Date(lesson.startAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <div className={styles.lesson}>
      <div className={styles.timeBlock}>
        <span className={styles.time}>{startTime}</span>
        <span className={styles.timeSep}>–</span>
        <span className={styles.time}>{endTime}</span>
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{lesson.client.name || '—'}</span>
        <span className={styles.date}>{date}</span>
      </div>
    </div>
  );
};
