import { Router } from "express";
import config from "../../config";
import StormDB from "stormdb";

const pages = (app: Router, db: StormDB): void => {
  const builds = db.get("builds").value();

  app.get("/", (req, res) => {
    res.render("index", { title: "Simple CI", port: config.port, builds: builds });
  });

  app.get("/build/:buildId", (req, res) => {
    res.render("detail");
  });
};

export default pages;
