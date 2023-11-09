export interface IGif {
  id: string;
  title: string;
  images: IImage;
}
export interface DetailedGif extends IGif {
  user: User;
  import_datetime: string;
}
interface User {
  display_name: string;
  description: string;
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
  sendQuery: (query: string, page: number) => void;
}
export interface PaginationProps {
  pageNumbers: Pages;
  activePage: number;
  setActive: (value: number) => void;
  getNewData: (query: undefined, toPage: number) => Promise<void>;
}
export interface PropsPlug {}
export interface QueryState {
  data?: IGif[];
  isLoading: boolean;
  details: DetailsState;
}
export interface DetailsState {
  isDetails: boolean;
  setIsDetails: (value: boolean) => void;
}
export interface SearchState {
  searchKeys: string;
  searchResult: string;
}
export interface APIState {
  Gifs: IGif[];
}
export interface DataWithPagination {
  pagination: Pagination;
}
interface Pagination {
  count: number;
  offset: number;
  total_count: number;
}
export interface Pages {
  numbers: number[];
  last: number;
}
export type BackData = [IGif[], Pages];
