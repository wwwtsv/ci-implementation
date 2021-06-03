import express from "express";
import bodyParser from "body-parser";
import http from "http";
import path from "path";
import config from "./config";
import Logger from "./loaders/logger";
import routes from "./api";
import IoServer from "./loaders/socket";
import stormDB from "./loaders/storm-db";

(async function startServer() {
  const app = express();

  const db = stormDB();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(config.api.prefix, routes());
  app.use(express.static(path.resolve("server", "public")));

  const server = http.createServer(app);

  app.set("views", path.resolve("server", "views"));
  app.set("view engine", "pug");
  Logger.info("Settled view engine");

  IoServer(server);
  Logger.info("Create socket instance");

  server
    .listen(config.port, () => {
      Logger.info(`🤖 Server listening on port: ${config.port}`);
    })
    .on("error", (error) => {
      Logger.error(error);
      process.exit(1);
    });
})();
