import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import http from "http";
import path from "path";
import config from "./config";
import Logger from "./loaders/logger";
import routes from "./api";
import IoServer from "./loaders/socket";
import stormDB from "./loaders/storm-db";
import connections from "./services/connections";

(async function startServer() {
  const app = express();

  const db = stormDB();

  const server = http.createServer(app);
  const io = IoServer(server);

  /* IO Services */
  io.on("connection", (socket) => {
    connections(io, socket);
  });

  /* Middlewares */
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.static(path.resolve("server", "public")));

  /* Routes */
  app.use(config.api.prefix, routes(db, io));

  /* Views */
  app.set("views", path.resolve("server", "views"));
  app.set("view engine", "pug");
  Logger.info("Settled view engine");

  /* Errors handling */
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    Logger.error(err.stack);
    res.status(500).send("Something broke!");
    next();
  });

  server
    .listen(config.port, () => {
      Logger.info(`🤖 Server listening on port: ${config.port}`);
    })
    .on("error", (error) => {
      Logger.error(error);
      process.exit(1);
    });
})();
