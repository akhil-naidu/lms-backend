// ^ 08 Let's use a class based Error handling

class ErrorHandler extends Error {
  /**
   *
   * @param {string} message New error message to be displayed
   * @param {number} statusCode New status code for the respective message
   */
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
