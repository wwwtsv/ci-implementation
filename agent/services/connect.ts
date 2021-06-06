import Logger from "../loaders/logger";
import { Socket } from "socket.io-client";

export const connect = (socket: Socket): void => {
  socket.on("connect", () => {
    if (socket.connected) {
      Logger.info(`Connected to ${socket.id}`);
    }
  });

  socket.on("connect_error", (error) => {
    Logger.error(error.message);
  });
};
