import http from "http";
import express from "express";
import Logger from "./loaders/logger";

(async function startServer() {
  const app = express();

  const server = http.createServer(app);

  server
    .listen(3010, () => {
      Logger.info(`
      🤖 Server listening on port: 3010
    `);
    })
    .on("error", (error) => {
      Logger.error(error);
      process.exit(1);
    });
})();
