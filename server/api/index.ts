import { Router } from "express";
import pages from "./routes/pages";
import build from "./routes/build";

const routes = (): Router => {
  const app = Router();
  pages(app);
  build(app);

  return app;
};

export default routes;
