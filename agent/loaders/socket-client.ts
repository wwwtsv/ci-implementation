import { io } from "socket.io-client";
import Logger from "./logger";
import config from "../config";

export default () => {
  const socket = io(`ws://localhost:${config.serverPort}`);

  socket.on("connect", () => {
    if (socket.connected) {
      Logger.info(`Connected to ${socket.id}`);
    }
  });

  socket.on("connect_error", (error) => {
    Logger.error(error.message);
  });

  return io;
};
