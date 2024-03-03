module.exports = (req, res, next) => {
  const requestId = crypto.randomUUID();

  req._requestId = requestId;
  res.set("X-Request-Id", requestId);

  return next();
};
