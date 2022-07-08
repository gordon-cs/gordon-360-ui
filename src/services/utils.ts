export type Override<What, With> = Omit<What, keyof With> & With;

/**
 * Create a closure to map an array on a given predicate
 *
 * @param predicate The predicate to map on
 * @returns a function that maps a given array to a new array on `predicate`
 */
export const map =
  <T, S>(predicate: (value: T, index: number, array: T[]) => S) =>
  (array: T[]): S[] =>
    array.map(predicate);

/**
 * Create a closure to filter an array by a given predicate
 *
 * @param predicate The predicate to filter by
 * @returns a function that filters a given array by `predicate`
 */
export const filter =
  <T>(predicate: (value: T, index: number, array: T[]) => boolean) =>
  (array: T[]): T[] =>
    array.filter(predicate);

/**
 * Create a closure to sort an array by a given predicate
 *
 * @param predicate The predicate to sort by
 * @returns a function that sorts a given array by `predicate`
 */
export const sort =
  <T>(predicate?: (a: T, b: T) => number) =>
  (array: T[]): T[] =>
    array.sort(predicate);

/**
 * Compare two objects by a common property
 *
 * @param property The property to compare by
 * @returns the sort order of the objects compared by `property`
 */
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
 * Transform a string of any case into a title case string.
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

/**
 * Create closures to serialize and deserialize an object of the type `initialSearchParams` to/from a query string.
 * Properties that haven't changed from their initial value are excluded from the query string during serialization.
 * Properties are coerced to their type in `initialSearchParams` during deserialization.
 *
 * @param initialSearchParams The shape and initial state of the search params.
 * @returns Functions to:
 *  1) serialize `searchParams` into a query string containing all the properties of `searchParams` that have changed from `initialSearchParams`
 *  2) deserialize a `URLSearchParams` into an object the same shape as `initialSearchParams`
 */
export const searchParamSerializerFactory = (
  initialSearchParams: Record<string, string | number | boolean>,
) => {
  const serializeSearchParams = (searchValues: Record<string, string | number | boolean>) =>
    Object.entries(searchValues) // Convert {key: value} object into array of [key, value] pairs
      .filter(([key, value]) => value !== initialSearchParams[key]) // Filter out unchanged items
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`) // transform [key, value] pairs into `key=value` strings after encoding `value`
      .join('&'); // Finally, join `key=value` strings with `&`

  // Closure to decode string value into it's original type (as found in initialSearchParams)
  // It's possible there's some TypeScript magic way to know what type each search param should decode to
  // But I couldn't figure it out.
  const deserializeSearchValue = (key: string, value: string) => {
    let decodedValue: string | number | boolean = decodeURIComponent(value);
    switch (typeof initialSearchParams[key]) {
      case 'string':
        decodedValue = value;
        break;
      case 'boolean':
        decodedValue = value === 'true';
        break;
      case 'number':
        decodedValue = parseInt(value);
        break;
      default:
        break;
    }
    return decodedValue;
  };

  const deserializeSearchParams = (queryString: URLSearchParams): typeof initialSearchParams =>
    Array.from(queryString).reduce(
      (state, [key, value]) => ({ ...state, [key]: deserializeSearchValue(key, value) }),
      {},
    );

  return { serializeSearchParams, deserializeSearchParams };
};
