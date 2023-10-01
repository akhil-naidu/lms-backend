// import ErrorHandler from '../utils/ErrorHandler';
import ErrorHandler from '../utils/ErrorHandler.js';

const errorMiddleware = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || 'internal server error';

  // wrong mongodb error
  if (error.name === 'cast error') {
    const message = `Resource not found. Invalid: ${error.path}`;
    error = new ErrorHandler(message, 400);
  }

  // Duplicate key error
  if (error.code === 11000) {
    const message = `Duplicate ${Object.keys(error.keyValue)} entered`;
    error = new ErrorHandler(message, 400);
  }

  // wrong jwt error
  if (error.name === 'JsonWebTokenError') {
    const message = `Json web token is invalid, try again`;
    error = new ErrorHandler(message, 400);
  }

  // JWT expired error
  if (error.name === 'TokenExpiredError') {
    const message = `Json web token is expired, try again`;
    error = new ErrorHandler(message, 400);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};

export default errorMiddleware;
