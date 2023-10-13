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
 * Create functions to serialize and deserialize an object of the given type to/from a query string.
 * Properties that haven't changed from their initial value are excluded from the query string during serialization.
 * Properties are converted to their type in `initialSearchParams` during deserialization.
 *
 * @param initialSearchParams The shape and initial state of the search params.
 * @returns Functions to:
 *  1) serialize `searchParams` into a query string containing all the properties of `searchParams` that have changed from `initialSearchParams`
 *  2) deserialize a `URLSearchParams` into an object of the same type as `initialSearchParams`.
 */
export const searchParamSerializerFactory = <
  TSearchParams extends Record<string, string | number | boolean>,
>(
  initialSearchParams: TSearchParams,
) => {
  /**
   * Convert an object of search params into a query string.
   *
   * @param searchParams search params object
   * @returns search params serialized as strings into a URLSearchParams object
   */
  const serializeSearchParams = (searchParams: TSearchParams): URLSearchParams => {
    // Convert {key: value} object into array of [key, value] pairs
    const paramsArray = Object.entries(searchParams);

    // Filter out unchanged items
    const updatedParams = paramsArray.filter(([key, value]) => value !== initialSearchParams[key]);

    // append each updated param to the output
    const serializedParams = new URLSearchParams();
    updatedParams.forEach(([key, value]) =>
      serializedParams.append(key, encodeURIComponent(value)),
    );

    // Return URLSearchParams containing serialized value for each param
    return serializedParams;
  };

  /**
   * Deserialize a string value to its type in `TSearchParams` for the given key.
   *
   * @param key The key of `TSearchParams` that the value corresponds to.
   * @param encodedValue The value as a string to deserialize
   * @returns value converted to its type in `TSearchParams`
   */
  const deserializeSearchValue = (key: keyof TSearchParams, encodedValue: string) => {
    let value: string = decodeURIComponent(encodedValue);
    switch (typeof initialSearchParams[key]) {
      case 'string':
        return value;
      case 'boolean':
        return value === 'true';
      case 'number':
        return parseInt(value);
      default:
        return value;
    }
  };

  /**
   * Deserialize a URLSearchParams object into a `TSearchParams` object.
   *
   * Any search params that aren't in `TSearchParams` are discarded.
   * If any key of `TSearchParams` is unspecified, it default to the initial value.
   *
   * @param queryString query string to deserialize to search params
   * @returns object of search params, defaulting to initial values for any unspecified params
   */
  const deserializeSearchParams = (queryString: URLSearchParams): TSearchParams => {
    const queryParams = Array.from(queryString);

    if (queryParams.length === 0) {
      return initialSearchParams;
    }

    return queryParams.reduce((state, [key, value]) => {
      if (key in initialSearchParams) {
        return { ...state, [key]: deserializeSearchValue(key, value) };
      } else {
        return state;
      }
    }, initialSearchParams);
  };

  return { serializeSearchParams, deserializeSearchParams };
};

type SearchParamValue = string | number | boolean | string[];
export class SearchParamHandler<TSearchParams extends Record<string, SearchParamValue>> {
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
        value.forEach((v) => serializedParams.append(key, encodeURIComponent(v)));
      } else {
        serializedParams.set(key, encodeURIComponent(value));
      }
    });

    console.log(serializedParams);

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
