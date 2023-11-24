import { IGif } from '../gif/gif.interface';
import { Pagination } from '../pagination/pagination.interface';

export interface DataField {
  data: IGif[];
  pagination: Pagination;
}
