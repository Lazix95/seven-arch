export function sortArray<T>(array: T[], key: keyof T, { mode = 'asc' }: { mode?: 'asc' | 'desc' } = {}) {
  return array.sort((a, b) => {
    if (mode === 'asc') {
      return a[key] > b[key] ? 1 : -1;
    }
    return a[key] < b[key] ? 1 : -1;
  });
}
