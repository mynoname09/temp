export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function hasName(error: unknown): error is { name: string } {
  return isObject(error) && typeof error.name === 'string';
}

export function hasCode(error: unknown): error is { code: string } {
  return isObject(error) && typeof error.code === 'string';
}

export function isAbortError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    (('name' in error &&
      (error as { name: string }).name === 'CanceledError') ||
      ('code' in error &&
        (error as { code: string }).code === 'ERR_CANCELED') ||
      (error instanceof DOMException && error.name === 'AbortError'))
  );
}
