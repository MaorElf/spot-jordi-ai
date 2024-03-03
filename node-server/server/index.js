const http = require("http");
const app = require("./src/app");

server = http.createServer(app);

const PORT = 3200;

server.listen(PORT, () => {
    console.info(`Listening on port ${PORT}...`);
});
