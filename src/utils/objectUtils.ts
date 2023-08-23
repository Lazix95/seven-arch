import { keys } from '@mui/system';

export function updateObjectEnteries<T extends object>(oldObject: T, newObject: Partial<T>) {
  return Object.keys(newObject).reduce(
    (acc, currentKey) => {
      const key = currentKey as keyof Partial<T>;
      return { ...acc, [currentKey]: newObject[key] };
    },
    { ...oldObject },
  );
}

export function arrayToObject<T extends object, K extends string | number | symbol>(array: T[], key: keyof T): { [key in K]: T } {
  return array.reduce((acc, current) => {
    return { ...acc, [current[key]]: current };
  }, {}) as { [key in K]: T };
}
