export interface DataProps {
  data: object[];
}
export interface IAPIItem {
  id?: string;
  title: string;
  images: IImage;
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
  getGif: (query: string) => void;
}
export interface PropsPlug {}
export interface QueryState {
  data?: IAPIItem[];
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
  APIItems: IAPIItem[];
}
export function isSpecificData(data: unknown): data is IAPIItem[] {
  if (
    Array.isArray(data) ||
    (typeof data === 'object' && data !== null && 'data' in data)
  )
    return true;
  return false;
}
