const store = (key: string, value: string) => localStorage.setItem(key, JSON.stringify(value));

/**
 * Get a value stored locally
 * @param key The key to lookup the value
 * @throws Will throw an error when the key is not set in local storage
 * @returns The value stored, if found
 */
const get = <T>(key: string): T => {
  const storedValue = localStorage.getItem(key);
  if (storedValue === null) {
    throw new Error(`Key '${key}' does not exist in local storage`);
  }

  try {
    return JSON.parse(storedValue);
  } catch (err) {
    throw new Error(`Could not parse value stored at '${key}'`);
  }
};

const remove = (key: string) => localStorage.removeItem(key);

/**
 * Store and retrieve app data locally
 * @description With app storage abstracted in this service, it is possible to change the underlying
 * storage driver from the current `localStorage` to a more featureful storage driver like
 * `IndexedDB` without needing to update any code that depends on this service.
 */
const storageUtils = {
  get,
  remove,
  store,
};

export default storageUtils;
