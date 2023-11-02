export interface DataProps {
  data: object[];
}
export interface APIItemProps {
  id?: string;
  title: string;
  images: IImage;
}
export interface ErrorProps {
  msg: string;
}
export interface IImage {
  original: IImageOriginal;
  fixed_width_small_still: IImageOriginal;
}
export interface IImageOriginal {
  mp4: string;
  url: string;
}
export interface FindTagProps {
  sendQuery: (query: string) => void;
}
export interface PropsPlug {}
export interface QueryState {
  data?: APIItemProps[];
  isLoading: boolean;
}
export interface SearchState {
  searchKeys: string;
  searchResult: string;
}
export interface ErrorState {
  isError: boolean;
}
export interface APIState {
  APIItems: APIItemProps[];
}
export function isSpecificData(data: unknown): data is APIItemProps[] {
  if (
    Array.isArray(data) ||
    (typeof data === 'object' && data !== null && 'data' in data)
  )
    return true;
  return false;
}
