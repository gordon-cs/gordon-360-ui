import { useContext } from 'react';

/**
 * @template T
 * @typedef {import('react').Context<T>} Context
 */

/**
 * Create a hook that uses the specified context
 *
 * @template T
 * @param {string} name The name of the context
 * @param {Context<T>} context The context object
 * @returns {function(): T} The hook
 */
const createUseContext = (name, context) => {
  return () => {
    const ctx = useContext(context);
    if (ctx === undefined) {
      throw new Error(`use${name}Context must be used withing a ${name}ContextProvider.`);
    }
    return ctx;
  };
};

export default createUseContext;
