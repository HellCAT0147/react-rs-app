export interface PropsPlug {}
export interface APIItemProps {
  key: number;
  title: string;
  src: string;
}
export interface SearchState {
  searchKeys: string;
  searchResult: string;
}
export interface APIState {
  APIItems: APIItemProps[];
}
