class AuthError {
  name: string;
  message: string;
  constructor(message: string) {
    this.name = 'AuthError';
    this.message = message || 'User is not authorized to access this resource';
  }
}
AuthError.prototype = Object.create(Error.prototype);

class NotFoundError {
  name: string;
  message: string;
  constructor(message: string | undefined) {
    this.name = 'NotFoundError';
    this.message = message || 'Resource not found';
  }
}
NotFoundError.prototype = Object.create(Error.prototype);

/**
 * Create an error object based on an HTTP error from the backend
 *
 * @param  err Error caught from HTTP request
 * @param res HTTP response
 * @returns An error
 */
const createError = (err: Error, res: Response): Error | AuthError | NotFoundError => {
  if (res.status === 401) {
    return new AuthError(err.message);
  } else if (res.status === 404) {
    return new NotFoundError(err.message);
  }

  return err;
};

export { AuthError, createError, NotFoundError };
