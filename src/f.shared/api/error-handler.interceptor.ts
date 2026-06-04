import { notification } from 'antd';
import axios from 'axios';

type ErrorPayload = {
  message?: string;
  error?: string;
};

export const errorHandler = (error: unknown) => {
  if (axios.isCancel(error)) return Promise.reject(error);

  if (!axios.isAxiosError<ErrorPayload>(error)) {
    notification.error({
      message: 'Ошибка запроса',
      description: 'Что-то пошло не так. Попробуйте ещё раз.',
      closable: true,
    });

    return Promise.reject(error);
  }

  if (error.response?.status === 401) {
    return Promise.reject(error);
  }

  const data = error.response?.data;
  notification.error({
    message: 'Ошибка запроса',
    description:
      (data && (data.message ?? data.error)) ??
      error.message ??
      'Что-то пошло не так. Попробуйте ещё раз.',
    closable: true,
  });

  return Promise.reject(error);
};
