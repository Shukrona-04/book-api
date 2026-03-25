const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
  if (!(err instanceof ApiError)) {
    console.error(err);
    err = ApiError.internal('Something went wrong');
  }

  res.status(err.statusCode).json({
    status: 'error',
    statusCode: err.statusCode,
    message: err.message,
  });
};

module.exports = errorHandler;