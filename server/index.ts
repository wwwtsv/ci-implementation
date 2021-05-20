import express from "express";
import config from "./config";
import Logger from "./loaders/logger";
import Loader from "./loaders";

(async function startServer() {
  const app = express();

  await Loader(app);

  app
    .listen(config.port, () => {
      Logger.info(`
      🤖 Server listening on port: ${config.port}
    `);
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });
})();
