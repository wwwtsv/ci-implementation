import { Request, Response, Router } from "express";
import { Server } from "socket.io";
import StormDB from "stormdb";
import createBuildProcess from "../../services/build";
import { BuildFormData } from "@interfaces/index";

const build = (app: Router, db: StormDB, io: Server): void => {
  app.post("/build", (req: Request, res: Response) => {
    const formData: BuildFormData = req.body;

    const buildId = createBuildProcess(formData, db, io);

    res.redirect(301, `/build/${buildId}`);
  });
};

export default build;
