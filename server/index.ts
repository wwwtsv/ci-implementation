import path from "path";
import http from "http";
import express from "express";
import config from "./config";
import Logger from "./loaders/logger";
import routes from "./api";
import socketInit from "./loaders/socket";

(async function startServer() {
  const app = express();

  const server = http.createServer(app);

  app.use(config.api.prefix, routes());

  app.use(express.static(path.resolve("server/public")));

  app.set("views", path.resolve("server/views"));
  app.set("view engine", "pug");
  Logger.info("Settled view engine");

  socketInit(server);
  Logger.info("Create socket instance");

  server
    .listen(config.port, () => {
      Logger.info(`
      🤖 Server listening on port: ${config.port}
    `);
    })
    .on("error", (error) => {
      Logger.error(error);
      process.exit(1);
    });
})();
