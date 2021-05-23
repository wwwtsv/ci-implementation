import http from "http";
import express from "express";
import Logger from "./loaders/logger";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

(async function startAgent() {
  const app = express();

  const server = http.createServer(app);

  const argv = yargs(hideBin(process.argv)).argv;

  const port = argv.port || 3001;

  server
    .listen(port, () => {
      Logger.info(`
      🤖 Agent listening on port: 3010
    `);
    })
    .on("error", (error) => {
      Logger.error(error);
      process.exit(1);
    });
})();
