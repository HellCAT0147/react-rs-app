import { IGif, DetailedGif, DataField, ValueOwner, APIError } from './types';

export function isData(data: unknown): data is IGif[] {
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

export function isAPIError(error: unknown): error is APIError {
  if (typeof error === 'object' && error !== null && 'error' in error)
    return true;
  return false;
}

export function hasPagination(something: unknown): something is DataField {
  if (
    typeof something === 'object' &&
    something !== null &&
    'pagination' in something &&
    'data' in something
  )
    return true;
  return false;
}

export function hasValueField(something: unknown): something is ValueOwner {
  if (
    typeof something === 'object' &&
    something !== null &&
    'value' in something
  )
    return true;
  return false;
}

export function isGif(something: unknown): something is DetailedGif {
  if (
    typeof something === 'object' &&
    something !== null &&
    'id' in something &&
    'title' in something
  )
    return true;
  return false;
}
