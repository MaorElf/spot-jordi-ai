const BaseError = require("../shared/BaseError");

module.exports = (err, req, res, _) => {
  console.error(err);

  const [http_code, message] =
    err instanceof BaseError
      ? [err.http_code, err.message]
      : [500, "something went wrong."];

  res.status(http_code).json({ message });
};
