interface ValueOwner {
  value: string;
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
