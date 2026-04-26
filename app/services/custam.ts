export function convertObjectToArray<T extends Record<string, any>>(
  obj: T
): { [K in keyof T]: { [P in K]: T[K] } }[keyof T][] {
  return Object.keys(obj).map((key) => ({
    [key]: obj[key as keyof T],
  })) as any;
}