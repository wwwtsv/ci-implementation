import { Router } from "express";
import renderMainPage from "../middlewares";

export default (app: Router): void => {
  app.get("/", renderMainPage);
};
