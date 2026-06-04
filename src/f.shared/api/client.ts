import axios from 'axios';

import { errorHandler } from '@/f.shared/api/error-handler.interceptor.ts';

import { config } from '../config';
import { refreshInterceptor } from './access-token.interceptor.ts';

export const api = axios.create({
  baseURL: config.API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use((response) => response, refreshInterceptor);

api.interceptors.response.use((resp) => resp, errorHandler);
