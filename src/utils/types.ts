export interface DataField {
  data: IGif[];
  pagination: Pagination;
}
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
  original: ImageOriginal;
  fixed_width_small_still: ImageSmall;
}
export interface ImageOriginal {
  mp4: string;
  url: string;
}
export interface ImageSmall {
  url: string;
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
export interface ErrorState {
  isError: boolean;
}
export interface ValueOwner {
  value: string;
}
export interface APIError {
  error: string;
  data: ErrorData;
}
interface ErrorData {
  meta: ErrorDetails;
}
interface ErrorDetails {
  msg: string;
  status: number;
}
