module.exports = class BaseError extends Error {
  constructor(http_code, message) {
    super(message);

    this.http_code = http_code;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "bad request.") {
    return new BaseError(400, message);
  }

  static unauthorized(message = "unauthorized.") {
    return new BaseError(401, message);
  }

  static forbidden(message = "forbidden.") {
    return new BaseError(403, message);
  }

  static notFound(message = "not found.") {
    return new BaseError(404, message);
  }

  static conflict(message = "already exists.") {
    return new BaseError(409, message);
  }

  static tooManyAttempts(message = "too many attempts.") {
    return new BaseError(429, message);
  }

  static internal(message = "internal error.") {
    return new BaseError(500, message);
  }
};
