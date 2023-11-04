import axios from 'axios';
import { BackData, Gif, Pages } from './types';
import { hasPagination, isData } from './type-guards';
import getPages from './pagination';

export default async function getAll(
  query: string,
  page: number,
  limit: number
): Promise<BackData | Error | false> {
  const offset: number = (page - 1) * limit;
  try {
    const response: Response = await axios({
      url: query
        ? 'https://api.giphy.com/v1/gifs/search'
        : 'https://api.giphy.com/v1/gifs/trending',
      params: {
        api_key: 'wc4t6jVyKwNgIYR7NvQq0RB70uN94Dl1',
        q: query,
        limit,
        offset,
      },
    });

    if (response.status === 200) {
      if (
        'data' in response &&
        isData(response.data) &&
        'data' in response.data &&
        isData(response.data.data)
      ) {
        const data: Gif[] = response.data.data;
        let pages: Pages = { numbers: [], last: 0 };

        if (hasPagination(response.data)) {
          const total: number = response.data.pagination.total_count;
          const maxAPIOffset: number = 5000;
          pages = getPages(
            Math.ceil((total > maxAPIOffset ? maxAPIOffset : total) / limit),
            page
          );
        }

        return [data, pages];
      }
    }
  } catch (error) {
    if (error instanceof Error) return error;
  }
  return false;
}
