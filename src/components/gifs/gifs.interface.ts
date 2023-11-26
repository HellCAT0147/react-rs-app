import { DetailedGif } from '../detailed-gif/detailed-gif.interface';
import { IGif } from '../gif/gif.interface';
import { Pagination } from '../pagination/pagination.interface';

export interface ServerData {
  gifsData: DataField;
  gifData: { data: DetailedGif };
}

export interface DataField {
  data: IGif[];
  pagination: Pagination;
}

export interface IGifs {
  data: IGif[];
}
