import { IGif } from '../gif/gif.interface';
import { Pagination } from '../pagination/pagination.interface';

export interface ServerData {
  data: DataField;
}

export interface DataField {
  data: IGif[];
  pagination: Pagination;
}
