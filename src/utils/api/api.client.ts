import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { requestHandler } from './api-base';

export function createApiClient(instance: AxiosInstance) {
  return {
    get: <T>(url: string, config?: AxiosRequestConfig) =>
      requestHandler(() => instance.get<T>(url, config).then(res => res.data)),

    post: <T, D = unknown>(url: string, data: D, config?: AxiosRequestConfig) =>
      requestHandler(() =>
        instance.post<T>(url, data, config).then(res => res.data),
      ),

    put: <T, D = unknown>(url: string, data: D, config?: AxiosRequestConfig) =>
      requestHandler(() =>
        instance.put<T>(url, data, config).then(res => res.data),
      ),

    patch: <T, D = unknown>(
      url: string,
      data: D,
      config?: AxiosRequestConfig,
    ) =>
      requestHandler(() =>
        instance.patch<T>(url, data, config).then(res => res.data),
      ),

    delete: <T>(url: string, config?: AxiosRequestConfig) =>
      requestHandler(() =>
        instance.delete<T>(url, config).then(res => res.data),
      ),
  };
}
