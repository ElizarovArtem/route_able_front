import { api } from './client.ts';

let isRefreshing = false;

export const refreshInterceptor = async (error: any) => {
  const originalRequest = error.config;

  // Если пришёл 401 и запрос ещё не был повторён
  if (
    error.response?.status === 401 &&
    !originalRequest._retry &&
    !originalRequest.url.includes('/auth/refresh') &&
    !originalRequest.url.includes('/auth/login')
  ) {
    originalRequest._retry = true;

    try {
      if (!isRefreshing) {
        isRefreshing = true;

        await api.post('/auth/refresh', undefined, { withCredentials: true });

        isRefreshing = false;
      }

      return api(originalRequest);
    } catch (refreshError) {
      isRefreshing = false;

      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};
