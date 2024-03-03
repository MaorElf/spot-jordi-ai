const BaseError = require("../shared/BaseError");

module.exports = () => {
  throw BaseError.notFound();
};
