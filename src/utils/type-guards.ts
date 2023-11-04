import { Gif, DataWithPagination } from './types';

export function isData(data: unknown): data is Gif[] {
  if (
    Array.isArray(data) ||
    (typeof data === 'object' && data !== null && 'data' in data)
  )
    return true;
  return false;
}

export function isError(error: unknown): error is Error {
  if (typeof error === 'object' && error !== null && 'message' in error)
    return true;
  return false;
}

export function hasPagination(
  something: unknown
): something is DataWithPagination {
  if (
    typeof something === 'object' &&
    something !== null &&
    'pagination' in something
  )
    return true;
  return false;
}
