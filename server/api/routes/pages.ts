import { Router } from "express";
import renderMainPage, { renderDetailPage } from "../middlewares";

const pages = (app: Router): void => {
  app.get("/", renderMainPage);

  app.get("/build/:buildId", renderDetailPage);
};

export default pages;
