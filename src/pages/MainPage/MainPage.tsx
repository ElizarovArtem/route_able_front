import React from 'react';

import styles from './MainPage.module.scss';

export const MainPage = () => {
  return (
    <div className={styles.wrapper}>
      <div>Поиск по тренеру</div>
      <div>Создать запрос на тренировку</div>
      <div>ИИ ассистент</div>
    </div>
  );
};
