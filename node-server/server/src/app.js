require("express-async-errors");

const express = require("express");

const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const routes = require("./routes");

const cors = require("./middleware/cors");
const requestIdGenerator = require("./middleware/requestIdGenerator");
const responseResolver = require("./middleware/responseResolver");
const notFoundHandler = require("./middleware/notFoundHandler");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app
    .use(requestIdGenerator)

    .use(helmet())
    .use(cors)

    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())

    .use(responseResolver)

    .use("/api", routes)

    .use(notFoundHandler)
    .use(errorHandler);

module.exports = app;
