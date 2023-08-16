export function updateObjectEnteries<T extends object>(oldObject: T, newObject: Partial<T>) {
  return Object.keys(newObject).reduce(
    (acc, currentKey) => {
      const key = currentKey as keyof Partial<T>;
      return { ...acc, [currentKey]: newObject[key] };
    },
    { ...oldObject }
  );
}
