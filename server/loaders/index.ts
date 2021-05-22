import { Application } from "express";
import Logger from "./logger";
import path from "path";

export default async (app: Application): Promise<Application> => {
  app.set("views", path.resolve("server/views"));
  app.set("view engine", "pug");
  Logger.info("Settled view engine");

  return app;
};
