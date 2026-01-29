import { formatDate as formatDateFns } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function getYearFromDateString(dateString: string | null): string {
  if (!dateString) {
    return 'Data desconhecida';
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Data inválida';
  }

  return date.getFullYear().toString();
}

export function formatDateToLocaleString(dateString: string | null): string {
  if (!dateString) {
    return 'Data desconhecida';
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Data inválida';
  }

  return formatDateFns(date, 'dd/MM/yyyy', { locale: ptBR });
}
