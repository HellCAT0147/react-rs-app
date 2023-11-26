import { IGif } from '../gif/gif.interface';

export interface DetailedGif extends IGif {
  user?: User;
  import_datetime?: string;
}

interface User {
  display_name: string;
  description: string;
}
