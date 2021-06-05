import { Router } from "express";
import pages from "./routes/pages";
import build from "./routes/build";
import StormDB from "stormdb";
import { Server } from "socket.io";

const routes = (db: StormDB, io: Server): Router => {
  const app = Router();
  pages(app);
  build(app, db, io);

  return app;
};

export default routes;
