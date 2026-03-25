class ApiError extends Error {
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }

  static badRequest(msg) {
    return new ApiError(400, msg);
  }
  static unauthorized(msg) {
    return new ApiError(401, msg);
  }
  static forbidden(msg) {
    return new ApiError(403, msg);
  }
  static notFound(msg) {
    return new ApiError(404, msg);
  }
  static methodNotAllowed(msg) {
    return new ApiError(405, msg);
  }
  static unprocessableEntity(msg) {
    return new ApiError(422, msg);
  }
  static internal(msg = 'Internal Server Error') {
    return new ApiError(500, msg);
  }
}

module.exports = ApiError;