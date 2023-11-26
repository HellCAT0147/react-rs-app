import { Pages } from '@/components/pagination/pagination.interface';

export default function getPages(last: number, current: number): Pages {
  const result: number[] = [];
  if (current > last) current = last;
  let i: number = current - 3 < 1 ? 1 : current - 3;
  const end: number = current + 3 > last ? last : current + 3;
  while (i <= end) {
    result.push(i++);
  }
  return { numbers: result, last };
}
