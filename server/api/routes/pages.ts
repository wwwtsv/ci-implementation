import { Router } from "express";
import config from "../../config";
import StormDB from "stormdb";
import { Build } from "@interfaces/index";

const pages = (app: Router, db: StormDB): void => {
  app.get("/", (req, res) => {
    const builds = db.get("builds").value() as Build[];
    res.render("index", { title: "Simple CI", port: config.port, builds: builds });
  });

  app.get("/build/:buildId", (req, res) => {
    const builds = db.get("builds").value() as Build[];

    const { buildId } = req.params;
    const build = builds.find((build) => build.id === buildId);
    res.render("detail", { build, port: config.port });
  });
};

export default pages;
