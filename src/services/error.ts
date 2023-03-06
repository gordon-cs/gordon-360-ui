class AuthError implements Error {
  name: string;
  message: string;
  constructor(message: string) {
    this.name = 'AuthError';
    this.message = message || 'User is not authorized to access this resource';
  }
}

class NotFoundError implements Error {
  name: string;
  message: string;
  constructor(message: string | undefined) {
    this.name = 'NotFoundError';
    this.message = message || 'Resource not found';
  }
}

class ConflictError implements Error {
  name: string;
  message: string;
  constructor(message: string | undefined) {
    this.name = 'ConflictError';
    this.message = message || 'Specified resource already exists';
  }
}

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
  } else if (res.status === 409) {
    return new ConflictError(err.message);
  }

  return err;
};

export { AuthError, createError, NotFoundError, ConflictError };
