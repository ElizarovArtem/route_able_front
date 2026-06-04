import type { AxiosError } from 'axios';

export const getScannerErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.name === 'NotAllowedError') {
    return 'Нет доступа к камере';
  }

  return 'Не удалось запустить сканер';
};

export const getLookupErrorMessage = (error?: AxiosError | null) => {
  if (error?.response?.status === 404) {
    return 'Продукт не найден. Можно ввести данные вручную.';
  }

  return 'Не удалось получить продукт по штрихкоду';
};
