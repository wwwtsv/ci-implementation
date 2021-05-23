import { Server } from "socket.io";
import uuid from "uuid";
import { Server as HttpServer } from "http";
import Logger from "./logger";

export default (server: HttpServer): Server => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    Logger.info(`A user connected ${socket.client}`);
    Logger.info(`Connection count: ${io.engine.clientsCount}`);
  });

  io.engine.generateId = () => {
    return uuid.v4();
  };

  return io;
};
