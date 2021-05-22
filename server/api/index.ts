import { Router } from "express";
import pages from "./routes/pages";

export default (): Router => {
  const app = Router();
  pages(app);

  return app;
};
