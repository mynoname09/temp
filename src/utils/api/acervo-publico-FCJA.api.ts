import axios, { AxiosInstance } from 'axios';
import { createApiClient } from './api.client';
import { IApi } from './api-base';

const apiAcervoPublicoFCJAaxios: AxiosInstance = axios.create({
  baseURL: process.env.GOV_BACK_API_URL!,
});

export const apiAcervoPublicoFCJA: IApi = createApiClient(
  apiAcervoPublicoFCJAaxios,
);
