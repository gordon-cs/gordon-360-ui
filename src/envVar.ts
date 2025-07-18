export const getEnvVar = (name: string): string | undefined => {
  // Use process.env if available (Jest, Node)
  if (typeof process !== 'undefined' && process.env?.[name] !== undefined) {
    return process.env[name];
  }

  // Use import.meta.env only if safe
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env?.[name] !== undefined) {
      return import.meta.env[name];
    }
  } catch {
    // Swallow any errors from trying to access import.meta
  }

  // Not found
  console.warn(`Environment variable "${name}" is not defined.`);
  return undefined;
};
