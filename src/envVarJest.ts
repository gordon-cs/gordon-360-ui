export const getEnvVar = (name: string): string | undefined => {
  if (typeof process !== 'undefined' && process.env?.[name] !== undefined) {
    return process.env[name];
  }
  console.log('process not available!!!!!!!');
  return undefined;
};
