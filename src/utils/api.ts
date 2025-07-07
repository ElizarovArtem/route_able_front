import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
});

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
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

          await api.post('/auth/refresh', null, { withCredentials: true });

          isRefreshing = false;
        }

        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
