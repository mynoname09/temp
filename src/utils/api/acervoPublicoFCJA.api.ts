import axios from 'axios';
import { createApiClient } from './api.client';

const apiAcervoPublicoFCJAAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GOV_BACK_API_URL!,
});

export const apiAcervoPublicoFCJA = createApiClient(apiAcervoPublicoFCJAAxios);

export interface CursorPaginationGovApi {
  cursor: string | null;
}

export class CursorPaginationResult<T> {
  readonly data: T[];
  readonly next_cursor?: string | null;

  constructor(data: T[], next_cursor?: string | null) {
    this.data = data;
    this.next_cursor = next_cursor;
  }
}
