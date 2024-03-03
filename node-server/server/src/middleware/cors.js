const cors = require("cors");

const ALLOWED_ORIGINS = [undefined, "http://localhost:3200"];

const corsMiddleware = cors({
  origin: (origin, callback) =>
    ALLOWED_ORIGINS.includes(origin)
      ? callback(null, true)
      : callback(new Error("Not allowed by CORS")),
  credentials: true,
  optionsSuccessStatus: 200,
});

module.exports = corsMiddleware;
