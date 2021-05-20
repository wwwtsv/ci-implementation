import { Application } from "express";
import Logger from "./logger";

export default async (app: Application): Promise<Application> => {
  app.set("views", "../views");
  app.set("view engine", "pug");
  Logger.info("Settled view engine");

  return app;
};
