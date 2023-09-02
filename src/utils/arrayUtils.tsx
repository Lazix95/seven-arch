export function sortArray<T>(array: T[], key: keyof T, { mode = 'asc' }: { mode?: 'asc' | 'desc' } = {}) {
  return array.sort((a, b) => {
    if (a[key] === undefined || b[key] === undefined) return 0;

    if (mode === 'asc') {
      return a[key] > b[key] ? 1 : -1;
    }
    return a[key] < b[key] ? 1 : -1;
  });
}

export function addOrUpdateEntityInArray<T extends object>(array: Array<T>, entity: T, key: keyof T): Array<T> {
  const index = array.findIndex((item) => item[key] === entity[key]);
  if (index === -1) {
    return [...array, entity];
  }
  return array.map((item) => (item[key] === entity[key] ? entity : item));
}

export function removeEntityFromArray<T extends object>(array: Array<T>, entity: T, key: keyof T): Array<T> {
  return array.filter((item) => item[key] !== entity[key]);
}
