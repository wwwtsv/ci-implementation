import { Request, Response, Router } from "express";
import { Server } from "socket.io";
import StormDB from "stormdb";
import { BuildFormData } from "@interfaces/index";
import createBuildProcess from "../../services/build";

const build = (app: Router, db: StormDB, io: Server): void => {
  app.post("/build", (req: Request, res: Response) => {
    const formData: BuildFormData = req.body;

    const buildId = createBuildProcess(formData, db, io);

    res.redirect(301, `/build/${buildId}`);
  });
};

export default build;
