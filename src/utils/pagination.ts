export default function getPages(count: number): number[] {
  const result: number[] = [];
  for (let i = 1; i <= count; i++) {
    result.push(i);
  }
  return result;
}
