module.exports = (req, res, next) => {
  res.items = (items = []) =>
    res.json({
      items: Array.isArray(items) ? items : [items],
    });

  return next();
};
