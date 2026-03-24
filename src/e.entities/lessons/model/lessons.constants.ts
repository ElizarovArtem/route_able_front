export enum TimeSlotStatus {
  FREE = 'FREE',
  BOOKED = 'BOOKED',
  DISABLED = 'DISABLED',
}

export enum LessonStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export enum CoachWorkoutSessionStatus {
  /**
   * Сессия забронирована (есть слот и запись)
   */
  BOOKED = 'BOOKED',

  /**
   * Тренер отметил, что занятие проведено
   * (ожидаем подтверждение клиента)
   */
  COMPLETED_BY_COACH = 'COMPLETED_BY_COACH',

  /**
   * Клиент подтвердил занятие
   * → финальный успешный статус
   * → списывается тренировка
   * → создаётся payout тренеру
   */
  CONFIRMED_BY_CLIENT = 'CONFIRMED_BY_CLIENT',

  /**
   * Автоподтверждение системой (если клиент не ответил)
   * → эквивалент CONFIRMED_BY_CLIENT
   */
  AUTO_CONFIRMED = 'AUTO_CONFIRMED',

  /**
   * Клиент отменил занятие
   */
  CANCELLED_BY_CLIENT = 'CANCELLED_BY_CLIENT',

  /**
   * Тренер отменил занятие
   */
  CANCELLED_BY_COACH = 'CANCELLED_BY_COACH',

  /**
   * Клиент не пришёл на занятие
   * (логика списания зависит от бизнес-правил)
   */
  NO_SHOW_CLIENT = 'NO_SHOW_CLIENT',

  /**
   * Тренер не пришёл на занятие
   * (обычно → возврат тренировки)
   */
  NO_SHOW_COACH = 'NO_SHOW_COACH',

  /**
   * Открыт спор по занятию
   * → блокирует payout
   */
  DISPUTED = 'DISPUTED',
}
