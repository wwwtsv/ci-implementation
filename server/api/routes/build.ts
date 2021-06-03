import { Request, Response, Router } from "express";

const build = (app: Router): void => {
  app.post("/build", (req: Request, res: Response) => {
    res.json(req.body);
  });
};

export default build;
