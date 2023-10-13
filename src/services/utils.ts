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

export class SearchParamHandler<
  TSearchParams extends Record<string, string | number | boolean | string[]>,
> {
  #initialParams: TSearchParams;

  constructor(initialParams: TSearchParams) {
    this.#initialParams = initialParams;
  }

  serialize(searchParams: TSearchParams): URLSearchParams {
    // Convert {key: value} object into array of [key, value] pairs
    const paramsArray = Object.entries(searchParams);

    // Filter out unchanged items
    const updatedParams = paramsArray.filter(([key, value]) => value !== this.#initialParams[key]);

    // append each updated param to the output
    const serializedParams = new URLSearchParams();
    updatedParams.forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => serializedParams.append(key, v));
      } else {
        serializedParams.set(key, value.toString());
      }
    });

    // Return URLSearchParams containing serialized value for each param
    return serializedParams;
  }

  deserialize(searchParams: URLSearchParams): TSearchParams {
    return Object.entries(this.#initialParams).reduce((params, [key, originalValue]) => {
      if (Array.isArray(originalValue)) {
        const value = searchParams.getAll(key);
        if (
          value.length === originalValue.length &&
          value.every((v, i) => v === originalValue[i])
        ) {
          return { ...params, [key]: value };
        }
      } else {
        const stringValue = searchParams.get(key);
        let value: typeof originalValue;
        if (stringValue !== null) {
          switch (typeof originalValue) {
            case 'string':
              value = decodeURIComponent(stringValue);
              break;
            case 'number':
              value = Number(stringValue);
              break;
            case 'boolean':
              value = stringValue === 'true';
              break;
            default:
              throw new Error('invalid type in SearchParamHandler.deserialize');
          }
          if (value !== originalValue) {
            return { ...params, [key]: value };
          }
        }
      }
      return params;
    }, this.#initialParams);
  }
}

/**
 * Removes the specified domain name from an email.
 *
 * If the domain is not specified, it defaults to '@gordon.edu'
 *
 * @param input the string from which to remove the domain
 * @param domain the domain to remove, default '@gordon.edu'
 * @returns the value of input with the domain stripped off the end
 */
export const stripDomain = (input: string, domain: string = '@gordon.edu') => {
  const domainIndex = input.toLowerCase().lastIndexOf(domain);

  // if domain was not found, return entire input
  if (domainIndex === -1) return input;

  // return input until domain
  return input.substring(0, domainIndex);
};
