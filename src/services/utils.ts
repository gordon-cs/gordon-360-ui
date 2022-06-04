export type Override<What, With> = Omit<What, keyof With> & With;

export const map =
  <T, S>(predicate: (value: T, index: number, array: T[]) => S) =>
  (array: T[]): S[] =>
    array.map(predicate);

export const filter =
  <T>(predicate: (value: T, index: number, array: T[]) => boolean) =>
  (array: T[]): T[] =>
    array.filter(predicate);

export const sort =
  <T>(predicate?: (a: T, b: T) => number) =>
  (array: T[]): T[] =>
    array.sort(predicate);

export const compareByProperty =
  <Type, Key extends keyof Type>(property: Key) =>
  (a: Type, b: Type): -1 | 0 | 1 => {
    if (a[property] > b[property]) {
      return 1;
    } else if (a[property] < b[property]) {
      return -1;
    } else {
      return 0;
    }
  };

/**
 * Transforms a string of any case into a title case string.
 * The string is split into words on the separator, and each word is capitalized.
 *
 * @param string a string to convert to Title Case, e.g. 'person first name'
 * @param separator the separator to split words on. defaults to a single space (`' '`)
 * @returns the string in title case, e.g. `Person First Name`
 */
export const toTitleCase = (string: string, separator = ' ') =>
  string
    .toLowerCase()
    .split(separator)
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join(' ');
