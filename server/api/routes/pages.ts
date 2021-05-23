import { Router } from "express";
import renderMainPage, { renderDetailPage } from "../middlewares";

export default (app: Router): void => {
  app.get("/", renderMainPage);

  app.get("/build/:buildId", renderDetailPage);
};
