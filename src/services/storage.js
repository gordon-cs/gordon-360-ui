/**
 * Store and retrieve app data locally
 *
 * @description With app storage abstracted in this service, it is possible to change the underlying
 * storage driver from the current `localStorage` to a more featureful storage driver like
 * `IndexedDB` without needing to update any code that depends on this service.
 *
 * @module storage
 */

/**
 * Store a value locally
 * @param {String} key Where to store the value
 * @param {any} value Data to store
 */
const store = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Get a value stored locally
 * @param {String} key Where value is stored
 * @return {any} Stored value
 * @throws Will throw an error when the key is not set in local storage
 */
const get = key => {
  const storedValue = localStorage.getItem(key);
  if (storedValue === null) {
    throw new Error(`Key '${key}' does not exist in local storage`);
  }

  let value;
  try {
    value = JSON.parse(storedValue);
  } catch (err) {
    throw new Error(`Could not parse value stored at '${key}'`);
  }
  return value;
};

/**
 * Remove a value stored locally
 * @param {String} key Where value is stored
 */
const remove = key => {
  localStorage.removeItem(key);
};

export default {
  get,
  remove,
  store,
};
