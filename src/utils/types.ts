export interface DataProps {
  data: object[];
}
export interface Gif {
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
export interface PaginationProps {
  pageNumbers: number[];
  activePage: number;
  setActive: (value: number) => void;
}
export interface PropsPlug {}
export interface QueryState {
  data?: Gif[];
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
  APIItems: Gif[];
}
export interface DataWithPagination {
  pagination: Pagination;
}
interface Pagination {
  count: number;
  offset: number;
  total_count: number;
}
export type BackData = [Gif[], number[]];
