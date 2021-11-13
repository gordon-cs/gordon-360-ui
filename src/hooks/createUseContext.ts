import { Context, useContext } from 'react';

/**
 * Create a hook that uses the specified context
 *
 * @template T
 * @param name The name of the context
 * @param context The context object
 * @returns The hook
 */
const createUseContext =
  <T>(name: string, context: Context<T>) =>
  () => {
    const ctx = useContext(context);
    if (ctx === undefined) {
      throw new Error(`use${name}Context must be used withing a ${name}ContextProvider.`);
    }
    return ctx;
  };

export default createUseContext;
