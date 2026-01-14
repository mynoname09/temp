import { useState, useCallback } from 'react';
import { AxiosRequestConfig } from 'axios';
import { ApiError, IApi } from '../utils/api/api-base';

export const useHttpClient = (api: IApi) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const request = useCallback(
    async <T>(fn: () => Promise<T>): Promise<T | undefined> => {
      setLoading(true);
      setError(null);

      try {
        const data = await fn();
        return data;
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError);
        throw apiError;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const get = useCallback(
    <T>(url: string, config?: AxiosRequestConfig) =>
      request<T>(() => api.get<T>(url, config)),
    [request, api],
  );

  const post = useCallback(
    <T, D = unknown>(url: string, data: D, config?: AxiosRequestConfig) =>
      request<T>(() => api.post<T, D>(url, data, config)),
    [request, api],
  );

  const put = useCallback(
    <T, D = unknown>(url: string, data: D, config?: AxiosRequestConfig) =>
      request<T>(() => api.put<T, D>(url, data, config)),
    [request, api],
  );

  const patch = useCallback(
    <T, D = unknown>(url: string, data: D, config?: AxiosRequestConfig) =>
      request<T>(() => api.patch<T, D>(url, data, config)),
    [request, api],
  );

  const del = useCallback(
    <T>(url: string, config?: AxiosRequestConfig) =>
      request<T>(() => api.delete<T>(url, config)),
    [request, api],
  );

  return {
    get,
    post,
    put,
    patch,
    delete: del,
    loading,
    error,
  };
};
