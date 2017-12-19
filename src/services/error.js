/**
 * Error
 *
 * @module error
 */

/**
 * Authentication Error
 * @global
 * @class
 * @param {String} message Error message
 */
function AuthError(message) {
  this.name = 'AuthError';
  this.message = message || 'User is not authorized to access this resource';
}
AuthError.prototype = Object.create(Error.prototype);

/**
 * Not found Error
 * @global
 * @class
 * @param {String} message Error message
 */
function NotFoundError(message) {
  this.name = 'NotFoundError';
  this.message = message || 'Resource not found';
}
NotFoundError.prototype = Object.create(Error.prototype);

/**
 * Create an error object based on an HTTP error from the backend
 * @param {Error} err Error caught from HTTP request
 * @param {Response} res HTTP response
 * @return {Error|AuthError} An error
 */
const createError = (err, res) => {
  if (res.status === 401) {
    return new AuthError(err.Message);
  } else if (res.status === 404) {
    return new NotFoundError();
  }

  return err;
};

export { AuthError, createError, NotFoundError };
