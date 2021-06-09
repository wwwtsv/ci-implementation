import http from "http";
import express from "express";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import Logger from "./loaders/logger";
import socketClientInit from "./loaders/socket-client";
import { connect } from "./services/connect";
import build from "./services/build";

(async function startAgent() {
  const app = express();

  const server = http.createServer(app);

  const argv = yargs(hideBin(process.argv)).option("port", {
    alias: "p",
    type: "number",
    default: 3010,
  }).argv;

  // https://github.com/yargs/yargs/issues/1953
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const port = argv.port;

  app.get("/", (_, res) => {
    res.send("Agent is ready!");
  });

  const socket = socketClientInit();
  /* Socket.io-client services */
  connect(socket);
  build(socket);

  server
    .listen(port, () => {
      Logger.info(`🤖 Agent listening on port: ${port}`);
    })
    .on("error", (error) => {
      Logger.error(error);
      process.exit(1);
    });
})();
