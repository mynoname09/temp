import axios, { AxiosRequestConfig } from 'axios';

export class ApiError extends Error {
  code: number;
  originalError?: unknown;

  constructor(message: string, code: number, originalError?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.originalError = originalError;
  }
}

export interface IApi {
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;

  post: <T, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ) => Promise<T>;

  put: <T, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ) => Promise<T>;

  patch: <T, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ) => Promise<T>;

  delete: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
}

export const requestHandler = async <T>(
  request: () => Promise<T>,
): Promise<T> => {
  try {
    const response = await request();
    if (process.env.NODE_ENV === 'development') {
      console.log('API Response:', response);
    }
    return response;
  } catch (error: unknown) {
    console.error('API Error Original:', error);

    if (axios.isAxiosError(error) && error.response) {
      const message = error.response.data?.message || error.message;
      throw new ApiError(message, error.response.status);
    }

    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new ApiError(errorMessage, 500);
  }
};