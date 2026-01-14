'use server';

import { apiAcervoPublicoFCJA } from '@/utils/api/acervo-publico-FCJA.api';

export async function createGovAction(governadorData: any) {
  const createGovResponse = await apiAcervoPublicoFCJA.post<any>(
    '/gov-temp',
    governadorData,
  );

  console.log(createGovResponse);
}
